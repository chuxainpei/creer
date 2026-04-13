'use client';

import { useState } from 'react';

import LoginForm from '@/src/components/admin/LoginForm';
import UploadPanel from '@/src/components/admin/UploadPanel';

export default function AdminPage() {
  const [token, setToken] = useState('');

  return (
    <main className="shell" style={{ padding: '2.4rem 0 3rem' }}>
      <section style={{ marginBottom: '1rem' }}>
        <h1 style={{ margin: '0 0 0.5rem', fontSize: '1.7rem' }}>就业问答管理后台</h1>
        <p style={{ margin: 0, color: 'var(--soft-ink)' }}>阶段一仅保留登录、上传和重建索引，不扩展复杂内容管理能力。</p>
      </section>

      <div style={{ display: 'grid', gap: '1rem' }}>
        <LoginForm onLogin={setToken} />
        <UploadPanel token={token} />
      </div>
    </main>
  );
}
