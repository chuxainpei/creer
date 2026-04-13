'use client';

import { useState } from 'react';

import LoginForm from '@/src/components/admin/LoginForm';
import UploadPanel from '@/src/components/admin/UploadPanel';

export default function AdminPage() {
  if (process.env.NEXT_PUBLIC_DEMO_MODE === '1') {
    return (
      <main className="page-shell py-8 sm:py-10">
        <section className="surface-grad inset-line rounded-[1.7rem] border border-white/80 p-6 shadow-soft sm:p-7">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">演示版不开放管理后台</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            当前 GitHub Pages 演示模式仅用于学生端体验展示，管理端上传与重建能力已在演示站禁用。正式部署环境可通过受控入口访问完整后台。
          </p>
        </section>
      </main>
    );
  }

  const [token, setToken] = useState('');

  return (
    <main className="page-shell py-8 sm:py-10">
      <section className="mb-6 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">就业问答管理后台</h1>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
          第一阶段只保留登录、文件上传、状态查看和索引重建，方便你先代维护知识库，再逐步交给老师接手。
        </p>
      </section>

      <div className="grid gap-5">
        <LoginForm onLogin={setToken} />
        <UploadPanel token={token} />
      </div>
    </main>
  );
}
