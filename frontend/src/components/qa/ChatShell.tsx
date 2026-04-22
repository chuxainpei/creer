'use client';

import { FormEvent, useMemo, useState, useTransition } from 'react';
import {
  FileStack,
  LoaderCircle,
  MessagesSquare,
  ScanSearch,
  SendHorizonal,
  ShieldCheck,
  Sparkles,
  UserRound,
  Workflow,
} from 'lucide-react';

import RecommendedQuestions from '@/src/components/qa/RecommendedQuestions';
import SourceTags from '@/src/components/qa/SourceTags';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent } from '@/src/components/ui/card';
import { Textarea } from '@/src/components/ui/textarea';
import { askQuestion, streamQuestion } from '@/src/lib/api';
import type { ChatMessage } from '@/src/lib/types';

interface ChatShellProps {
  initialPrompts: string[];
}

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    '我已经准备好根据你的问题返回结构化结论。你可以直接问院校推荐、岗位方向比较、秋招节奏或能力补齐建议。',
  status: 'done',
  sourceTags: [
    { label: '官方优先', source_type: 'official' },
    { label: '规则引擎', source_type: 'model_rule' },
  ],
  usedOfficial: true,
};

const confidenceTone = {
  high: 'border-success/20 bg-success/10 text-success',
  medium: 'border-warning/20 bg-warning/10 text-warning-foreground',
  low: 'border-danger/20 bg-danger/10 text-danger',
} as const;

export default function ChatShell({ initialPrompts }: ChatShellProps) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const helperTags = useMemo(
    () => [
      { label: '官方优先', source_type: 'official' as const },
      { label: '经验补充', source_type: 'graduate_reference' as const },
      { label: '规则引擎', source_type: 'model_rule' as const },
    ],
    [],
  );

  async function sendQuestion(nextQuestion: string) {
    const trimmedQuestion = nextQuestion.trim();
    if (!trimmedQuestion) {
      return;
    }

    setError('');
    setQuestion('');
    const assistantId = `assistant-${Date.now()}`;
    const nextMessages: ChatMessage[] = [
      { id: `user-${Date.now()}`, role: 'user', content: trimmedQuestion, status: 'done' },
      { id: assistantId, role: 'assistant', content: '', status: 'streaming', sourceTags: [], evidence: [] },
    ];

    startTransition(() => {
      setMessages((current) => [...current, ...nextMessages]);
    });

    try {
      await streamQuestion(trimmedQuestion, {
        onDelta: (chunk) => {
          setMessages((current) =>
            current.map((message) =>
              message.id === assistantId
                ? { ...message, content: `${message.content}${chunk}`, status: 'streaming' }
                : message,
            ),
          );
        },
        onMetadata: (metadata) => {
          setMessages((current) =>
            current.map((message) =>
              message.id === assistantId
                ? {
                    ...message,
                    status: 'done',
                    sourceTags: metadata.source_tags,
                    evidence: metadata.evidence,
                    usedOfficial: metadata.used_official,
                    recommendations: metadata.recommendations,
                    credibility: metadata.credibility,
                    responseMode: metadata.response_mode,
                  }
                : message,
            ),
          );
        },
      });
    } catch (streamError) {
      try {
        const fallback = await askQuestion(trimmedQuestion);
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId
              ? {
                  ...message,
                  content: fallback.answer,
                  status: 'done',
                  sourceTags: fallback.source_tags,
                  evidence: fallback.evidence,
                  usedOfficial: fallback.used_official,
                  recommendations: fallback.recommendations,
                  credibility: fallback.credibility,
                  responseMode: fallback.response_mode,
                }
              : message,
          ),
        );
      } catch (fallbackError) {
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId
              ? {
                  ...message,
                  content: '当前无法完成问答请求，请稍后重试。',
                  status: 'error',
                }
              : message,
          ),
        );
        setError(fallbackError instanceof Error ? fallbackError.message : '请求失败');
      }
    }
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendQuestion(question);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
      <div className="browser-shell overflow-hidden p-4 sm:p-5">
        <div className="flex items-center gap-2 border-b border-white/70 pb-3">
          <span className="browser-dot bg-[#ff8b7b]" />
          <span className="browser-dot bg-[#ffd86f]" />
          <span className="browser-dot bg-[#6ad39b]" />
          <div className="ml-2 rounded-full bg-white/70 px-3 py-1 text-[11px] text-muted-foreground">xingtu://assistant/qa</div>
          <div className="ml-auto flex items-center gap-2 text-[11px] font-semibold text-primary">
            <MessagesSquare className="h-3.5 w-3.5" />
            星图助手在线
          </div>
        </div>

        <div className="space-y-5 pt-4">
          <div className="rounded-[1.6rem] border border-white/80 bg-white/88 p-4 sm:p-5">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-3">
                  <div
                    className={
                      message.role === 'user'
                        ? 'ml-auto flex max-w-[88%] items-start gap-3'
                        : 'flex max-w-[95%] items-start gap-3'
                    }
                  >
                    <div
                      className={
                        message.role === 'user'
                          ? 'order-2 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-accent text-accent-foreground'
                          : 'flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary/12 text-primary'
                      }
                    >
                      {message.role === 'user' ? <UserRound className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                    </div>
                    <div
                      className={
                        message.role === 'user'
                          ? 'order-1 rounded-[1.4rem] rounded-br-md bg-accent px-4 py-3 text-sm leading-7 text-accent-foreground'
                          : 'rounded-[1.4rem] rounded-bl-md border border-border/70 bg-white px-4 py-3 text-sm leading-7 text-foreground shadow-soft'
                      }
                    >
                      {message.content || (
                        <span className="inline-flex items-center gap-2 text-muted-foreground">
                          <LoaderCircle className="h-4 w-4 animate-spin" />
                          正在生成推荐…
                        </span>
                      )}
                    </div>
                  </div>

                  {message.role === 'assistant' && message.recommendations?.length ? (
                    <div className="ml-11 grid gap-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">推荐方案</p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {message.recommendations.map((item) => (
                          <div key={item.id} className="rounded-2xl border border-border/70 bg-gradient-to-b from-white to-muted/35 p-3">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm font-semibold text-foreground">{item.title}</p>
                              <span
                                className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${confidenceTone[item.confidence]}`}
                              >
                                {item.confidence === 'high' ? '高把握' : item.confidence === 'medium' ? '中把握' : '低把握'}
                              </span>
                            </div>
                            <p className="mt-2 text-xs leading-6 text-muted-foreground">匹配原因：{item.fit_reason}</p>
                            <p className="mt-1 text-xs leading-6 text-muted-foreground">行动建议：{item.action}</p>
                            <p className="mt-1 text-xs leading-6 text-muted-foreground">风险提示：{item.risk_hint}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {message.role === 'assistant' && (message.sourceTags?.length || message.evidence?.length || message.credibility?.length) ? (
                    <div className="ml-11 space-y-2 rounded-2xl border border-border/70 bg-muted/35 p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">来源与可信度</p>
                      {message.sourceTags?.length ? <SourceTags tags={message.sourceTags} /> : null}
                      {message.usedOfficial ? <p className="text-xs text-muted-foreground">该回答已按官方资料优先策略生成。</p> : null}
                      {message.evidence?.length ? (
                        <div className="space-y-2">
                          {message.evidence.map((item) => (
                            <div key={`${item.source_type}-${item.source_name}-${item.snippet}`} className="space-y-1">
                              <p className="text-xs font-medium text-foreground">{item.source_name}</p>
                              <p className="text-xs leading-6 text-muted-foreground">{item.snippet}</p>
                            </div>
                          ))}
                        </div>
                      ) : null}
                      {message.credibility?.length ? (
                        <div className="grid gap-2 sm:grid-cols-3">
                          {message.credibility.map((item) => (
                            <div key={`${item.label}-${item.level}`} className="rounded-xl border border-border/70 bg-white/80 p-2.5">
                              <p className="text-xs font-semibold text-foreground">{item.label}</p>
                              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{item.detail}</p>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={submit} className="rounded-[1.6rem] border border-white/80 bg-white/85 p-4 sm:p-5">
            <label className="sr-only" htmlFor="question-input">
              输入问题
            </label>
            <Textarea
              id="question-input"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="例如：如果我 GPA 一般但项目经历不错，该如何规划升学和秋招两条路？"
              rows={4}
            />
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">推荐类问题更容易展示完整链路：结论、推荐、风险与可信度。</p>
              <Button type="submit" className="gap-2 self-start bg-primary text-primary-foreground hover:bg-primary/90 sm:self-auto" disabled={isPending}>
                {isPending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <SendHorizonal className="h-4 w-4" />}
                发送问题
              </Button>
            </div>
            {error ? <div className="mt-3 rounded-2xl border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger">{error}</div> : null}
          </form>
        </div>
      </div>

      <div className="space-y-4">
        <div className="browser-shell p-4 sm:p-5">
          <div className="flex items-center gap-2 border-b border-white/70 pb-3">
            <FileStack className="h-4 w-4 text-primary" />
            <p className="text-sm font-semibold text-foreground">当前可引用上下文</p>
          </div>
          <div className="grid gap-2 pt-4">
            <div className="rounded-xl bg-white/85 px-3 py-2 text-sm text-foreground">简历.pdf</div>
            <div className="rounded-xl bg-white/85 px-3 py-2 text-sm text-foreground">院校招生简章</div>
            <div className="rounded-xl bg-white/85 px-3 py-2 text-sm text-foreground">目标岗位 JD</div>
            <div className="rounded-xl bg-white/85 px-3 py-2 text-sm text-foreground">毕业去向样例数据</div>
          </div>
        </div>

        <RecommendedQuestions questions={initialPrompts} onPick={(prompt) => void sendQuestion(prompt)} />

        <div className="browser-shell p-4 sm:p-5">
          <div className="flex items-center gap-2 border-b border-white/70 pb-3">
            <ScanSearch className="h-4 w-4 text-primary" />
            <p className="text-sm font-semibold text-foreground">回答逻辑</p>
          </div>
          <div className="space-y-4 pt-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <Workflow className="mt-0.5 h-4 w-4 text-primary" />
              <p>先给可执行结论，再给推荐项和风险提示，避免空泛建议。</p>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
              <p>官方口径优先，经验信息只作补充，让输出更可解释。</p>
            </div>
            <SourceTags tags={helperTags} />
          </div>
        </div>
      </div>
    </div>
  );
}
