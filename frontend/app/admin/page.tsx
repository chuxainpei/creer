'use client';

import { useState } from 'react';

import LoginForm from '@/src/components/admin/LoginForm';
import UploadPanel from '@/src/components/admin/UploadPanel';

export default function AdminPage() {
  if (process.env.NEXT_PUBLIC_DEMO_MODE === '1') {
    return (
      <main className="page-shell space-y-8 py-8 sm:space-y-10 sm:py-10">
        <section className="hero-grid rounded-[2rem] px-6 py-8 sm:px-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="command-chip">系统后台</span>
              <span className="rounded-full border border-white/80 bg-white/78 px-3 py-1 text-xs font-semibold text-muted-foreground">
                只读演示模式
              </span>
            </div>
            <div className="space-y-2">
              <h1 className="display-type text-3xl font-semibold tracking-tight sm:text-5xl">后台在正式部署时启用</h1>
              <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                当前线上演示只保留系统状态和能力展示，上传资料、重建索引与权限控制将在正式环境开放。
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="neo-panel rounded-[1.4rem] p-5">
            <p className="text-sm font-semibold text-foreground">官方资料库</p>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">用于同步院校公告、政策文件与说明资料。</p>
          </div>
          <div className="neo-panel rounded-[1.4rem] p-5">
            <p className="text-sm font-semibold text-foreground">去向数据</p>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">用于展示毕业去向样例和推荐规则辅助依据。</p>
          </div>
          <div className="neo-panel rounded-[1.4rem] p-5">
            <p className="text-sm font-semibold text-foreground">规则引擎</p>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">用于控制回答结构、优先级和可信度展示方式。</p>
          </div>
        </section>
      </main>
    );
  }

  const [token, setToken] = useState('');

  return (
    <main className="page-shell space-y-8 py-8 sm:space-y-10 sm:py-10">
      <section className="hero-grid rounded-[2rem] px-6 py-8 sm:px-8">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="command-chip">系统后台</span>
            <span className="rounded-full border border-white/80 bg-white/78 px-3 py-1 text-xs font-semibold text-muted-foreground">
              最低业务保留
            </span>
          </div>
          <div className="space-y-2">
            <h1 className="display-type text-3xl font-semibold tracking-tight sm:text-5xl">轻量控制台</h1>
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              这里只保留最必要的后台能力：登录、状态查看、资料上传和索引重建。它的目标不是做复杂后台，而是证明系统是完整可控的。
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-5">
        <LoginForm onLogin={setToken} />
        <UploadPanel token={token} />
      </div>
    </main>
  );
}
