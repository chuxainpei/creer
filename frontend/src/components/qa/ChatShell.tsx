'use client';

import { FormEvent, useState } from 'react';

import { askQuestion } from '@/src/lib/api';
import type { AskResponse } from '@/src/lib/types';

interface ChatShellProps {
  initialQuestion: string;
}

export default function ChatShell({ initialQuestion }: ChatShellProps) {
  const [question, setQuestion] = useState(initialQuestion);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!question.trim()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res: AskResponse = await askQuestion(question.trim());
      setAnswer(res.answer);
    } catch (err) {
      setError(err instanceof Error ? err.message : '请求失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card" style={{ padding: '1rem' }}>
      <h3 style={{ margin: '0.2rem 0 0.7rem', fontSize: '1rem' }}>就业问答</h3>
      <form onSubmit={submit}>
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          rows={4}
          placeholder="例如：双选会如何报名？"
          style={{
            width: '100%',
            borderRadius: '12px',
            border: '1px solid var(--line)',
            padding: '0.7rem 0.8rem',
            resize: 'vertical',
            font: 'inherit',
            color: 'var(--ink)',
            background: '#fff',
          }}
        />
        <div style={{ marginTop: '0.7rem', display: 'flex', justifyContent: 'space-between', gap: '0.8rem' }}>
          <span style={{ color: 'var(--soft-ink)', fontSize: '0.82rem' }}>
            回答默认优先官方通知和办事指南。
          </span>
          <button
            type="submit"
            disabled={loading}
            style={{
              border: 0,
              borderRadius: '10px',
              background: 'var(--primary)',
              color: '#fff',
              padding: '0.48rem 0.95rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? '生成中...' : '发送问题'}
          </button>
        </div>
      </form>

      {error ? (
        <p style={{ marginTop: '0.8rem', color: '#b42318', fontSize: '0.85rem' }}>{error}</p>
      ) : null}

      <div
        style={{
          marginTop: '0.9rem',
          minHeight: '104px',
          borderRadius: '12px',
          border: '1px solid var(--line)',
          padding: '0.75rem',
          background: '#fff',
          color: answer ? 'var(--ink)' : 'var(--soft-ink)',
          lineHeight: 1.6,
        }}
      >
        {answer || '回答区域：提交问题后显示官方优先答案。'}
      </div>
    </section>
  );
}
