'use client';

import { useState } from 'react';

import LoginForm from '@/src/components/admin/LoginForm';
import UploadPanel from '@/src/components/admin/UploadPanel';

export default function AdminPage() {
  if (process.env.NEXT_PUBLIC_DEMO_MODE === '1') {
    return (
      <main className="page-shell space-y-8 py-8 sm:space-y-10 sm:py-10">
        <section className="tabbit-hero">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <span className="tabbit-pill">系统后台</span>
                <span className="tabbit-pill">只读演示模式</span>
              </div>
              <div className="space-y-3">
                <p className="tabbit-kicker">保持最低业务，保留完整产品感</p>
                <h1 className="tabbit-section-title">后台在正式部署时启用</h1>
                <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                  当前线上版本只展示系统状态、数据来源和规则层级。上传资料、重建索引与权限控制会在正式环境开放。
                </p>
              </div>
            </div>
            <div className="tabbit-frame p-4 sm:p-5">
              <div className="flex items-center gap-2 border-b border-[rgba(17,24,39,0.06)] pb-3">
                <span className="browser-dot bg-[#ff8b7b]" />
                <span className="browser-dot bg-[#ffd86f]" />
                <span className="browser-dot bg-[#6ad39b]" />
                <div className="ml-2 rounded-full bg-[#f5f6f8] px-3 py-1 text-[11px] text-muted-foreground">xingtu://admin/preview</div>
              </div>
              <div className="grid gap-3 pt-4 sm:grid-cols-2">
                <div className="tabbit-pane">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">官方资料库</p>
                  <p className="mt-3 text-sm leading-7 text-foreground">用于同步院校公告、政策文件与说明资料。</p>
                </div>
                <div className="tabbit-pane">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">去向数据</p>
                  <p className="mt-3 text-sm leading-7 text-foreground">用于展示毕业去向样例和推荐规则辅助依据。</p>
                </div>
                <div className="tabbit-pane">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">规则引擎</p>
                  <p className="mt-3 text-sm leading-7 text-foreground">用于控制回答结构、优先级和可信度展示方式。</p>
                </div>
                <div className="tabbit-pane">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">权限控制</p>
                  <p className="mt-3 text-sm leading-7 text-foreground">正式环境里开放上传、重建索引和管理入口。</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const [token, setToken] = useState('');

  return (
    <main className="page-shell space-y-8 py-8 sm:space-y-10 sm:py-10">
      <section className="tabbit-hero">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <span className="tabbit-pill">系统后台</span>
            <span className="tabbit-pill">最低业务保留</span>
          </div>
          <div className="space-y-3">
            <p className="tabbit-kicker">用于继续接入真实资料与知识库</p>
            <h1 className="tabbit-section-title">轻量控制台</h1>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              这里只保留最必要的后台能力：登录、状态查看、资料上传和索引重建。它的目的不是展示复杂后台，而是证明产品具备真实可控的运行闭环。
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
