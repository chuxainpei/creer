'use client';

import { FormEvent, useState } from 'react';

interface LoginFormProps {
  onLogin: (token: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [token, setToken] = useState('admin-dev-token');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin(token.trim());
  };

  return (
    <section className="card" style={{ padding: '1rem' }}>
      <h3 style={{ margin: '0.2rem 0 0.8rem', fontSize: '1rem' }}>管理员登录</h3>
      <form onSubmit={submit} style={{ display: 'grid', gap: '0.7rem' }}>
        <input
          value={token}
          onChange={(event) => setToken(event.target.value)}
          type="password"
          placeholder="输入管理 Token"
          style={{
            border: '1px solid var(--line)',
            borderRadius: '10px',
            padding: '0.6rem 0.7rem',
            font: 'inherit',
          }}
        />
        <button
          type="submit"
          style={{
            border: 0,
            borderRadius: '10px',
            background: 'var(--primary)',
            color: '#fff',
            fontWeight: 700,
            padding: '0.55rem 0.8rem',
            cursor: 'pointer',
          }}
        >
          登录
        </button>
      </form>
    </section>
  );
}
