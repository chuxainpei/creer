import type { AskResponse } from '@/src/lib/types';

export async function askQuestion(question: string): Promise<AskResponse> {
  const res = await fetch('/api/qa/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) {
    throw new Error('Failed to ask question');
  }

  return res.json();
}
