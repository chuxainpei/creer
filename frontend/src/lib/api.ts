import type { AdminStatus, AskResponse, StreamMetadata } from '@/src/lib/types';
import { buildDemoAskResponse } from '@/src/lib/demo-mock';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';
const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === '1';
const RETRYABLE_STATUS = new Set([408, 429, 500, 502, 503, 504]);
const RETRY_BACKOFF_MS = [280, 900];

interface StreamHandlers {
  onDelta: (text: string) => void;
  onMetadata: (metadata: StreamMetadata) => void;
}

function getApiUrl(path: string) {
  return `${API_BASE}${path}`;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(path: string, init: RequestInit): Promise<Response> {
  let attempt = 0;
  let lastError: Error | null = null;

  while (attempt <= RETRY_BACKOFF_MS.length) {
    try {
      const res = await fetch(getApiUrl(path), init);
      if (res.ok) {
        return res;
      }

      if (!RETRYABLE_STATUS.has(res.status) || attempt >= RETRY_BACKOFF_MS.length) {
        return res;
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('网络请求失败');
      if (attempt >= RETRY_BACKOFF_MS.length) {
        throw lastError;
      }
    }

    await sleep(RETRY_BACKOFF_MS[attempt]);
    attempt += 1;
  }

  throw lastError ?? new Error('请求失败');
}

function parseEventBlock(block: string): { event: string; data: unknown } | null {
  const lines = block
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  if (!lines.length) {
    return null;
  }

  const event = lines.find((line) => line.startsWith('event:'))?.replace('event:', '').trim() || 'message';
  const dataLine = lines.find((line) => line.startsWith('data:'));
  if (!dataLine) {
    return null;
  }

  return {
    event,
    data: JSON.parse(dataLine.replace('data:', '').trim()),
  };
}

export async function askQuestion(question: string): Promise<AskResponse> {
  try {
    const res = await fetchWithRetry('/api/v1/qa/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });

    if (!res.ok) {
      if (DEMO_MODE) {
        return buildDemoAskResponse(question);
      }
      throw new Error('问答请求失败');
    }

    return res.json();
  } catch (error) {
    if (DEMO_MODE) {
      return buildDemoAskResponse(question);
    }
    throw error;
  }
}

export async function streamQuestion(question: string, handlers: StreamHandlers): Promise<void> {
  if (DEMO_MODE) {
    const fallback = await askQuestion(question);
    handlers.onDelta(fallback.answer);
    handlers.onMetadata({
      source_tags: fallback.source_tags,
      evidence: fallback.evidence,
      used_official: fallback.used_official,
      recommendations: fallback.recommendations,
      credibility: fallback.credibility,
      response_mode: fallback.response_mode,
    });
    return;
  }

  const res = await fetchWithRetry('/api/v1/qa/stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });

  if (!res.ok || !res.body) {
    throw new Error('流式问答不可用');
  }

  try {
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { value, done } = await reader.read();
      buffer += decoder.decode(value || new Uint8Array(), { stream: !done });

      let boundaryIndex = buffer.indexOf('\n\n');
      while (boundaryIndex !== -1) {
        const block = buffer.slice(0, boundaryIndex);
        buffer = buffer.slice(boundaryIndex + 2);
        const parsed = parseEventBlock(block);
        if (parsed?.event === 'delta' && parsed.data && typeof parsed.data === 'object' && 'text' in parsed.data) {
          handlers.onDelta(String(parsed.data.text));
        }
        if (parsed?.event === 'metadata') {
          handlers.onMetadata(parsed.data as StreamMetadata);
        }
        boundaryIndex = buffer.indexOf('\n\n');
      }

      if (done) {
        break;
      }
    }
  } catch (error) {
    if (!DEMO_MODE) {
      throw error;
    }
  }
}

async function adminRequest<T>(path: string, token: string, init?: RequestInit): Promise<T> {
  const res = await fetch(getApiUrl(path), {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('后台请求失败');
  }

  return res.json();
}

export async function loginAdmin(token: string): Promise<{ ok: boolean; access_token: string }> {
  const res = await fetch(getApiUrl('/api/v1/admin/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });

  if (!res.ok) {
    throw new Error('登录失败');
  }

  return res.json();
}

export function getAdminStatus(token: string) {
  return adminRequest<AdminStatus>('/api/v1/admin/status', token);
}

export function reindexAdmin(token: string) {
  return adminRequest<AdminStatus & { status: string }>('/api/v1/admin/reindex', token, {
    method: 'POST',
  });
}

export async function uploadAdminFile(path: string, token: string, file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return adminRequest<{ ok: boolean; filename: string; bytes: number }>(path, token, {
    method: 'POST',
    body: formData,
  });
}
