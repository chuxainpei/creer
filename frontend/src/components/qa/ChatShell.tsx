'use client';

import { FormEvent, useMemo, useState, useTransition } from 'react';
import { LoaderCircle, SendHorizonal, ShieldCheck, Sparkles, UserRound } from 'lucide-react';

import RecommendedQuestions from '@/src/components/qa/RecommendedQuestions';
import SourceTags from '@/src/components/qa/SourceTags';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
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
    '欢迎来到参赛演示版。你可以直接问“院校推荐、岗位推荐、对比选择、时间线规划”。我会先给结论，再给可执行推荐项，并附来源与可信度说明。',
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
    } catch (err) {
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
    <div className="grid gap-6 xl:grid-cols-[1.45fr_0.9fr]">
      <Card className="neo-panel overflow-hidden">
        <CardHeader className="border-b border-border/70 bg-white/84">
          <div className="flex flex-wrap items-center gap-3">
            <span className="command-chip">决策驾驶舱</span>
            <Badge variant="secondary">万能回答引擎</Badge>
            <Badge variant="secondary">推荐排序</Badge>
          </div>
          <CardTitle className="display-type text-2xl sm:text-3xl">升学与就业决策驾驶舱</CardTitle>
          <CardDescription>先输出结论，再给推荐项、行动步骤和可信度提示，最大化评审时的产品真实感。</CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 p-5 sm:p-6">
          <div className="space-y-4 rounded-[1.5rem] border border-border/60 bg-white/88 p-4 sm:p-5">
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
                            <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${confidenceTone[item.confidence]}`}>
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

          {error ? (
            <div className="rounded-2xl border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger">
              {error}
            </div>
          ) : null}

          <form onSubmit={submit} className="space-y-4">
            <label className="sr-only" htmlFor="question-input">
              输入问题
            </label>
            <Textarea
              id="question-input"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="例如：我适合冲刺哪些院校？我该主攻哪些岗位？"
              rows={4}
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">推荐类问题更容易看到完整演示：结论 + 推荐项 + 可信度说明。</p>
              <Button
                type="submit"
                className="gap-2 self-start bg-primary text-primary-foreground hover:bg-primary/90 sm:self-auto"
                disabled={isPending}
              >
                {isPending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <SendHorizonal className="h-4 w-4" />}
                发送问题
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <RecommendedQuestions questions={initialPrompts} onPick={(prompt) => void sendQuestion(prompt)} />
        <Card className="neo-panel">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">回答逻辑</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
              <p>先给可执行结论，再给推荐项和风险提示，避免只给空泛建议。</p>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-4 w-4 text-warning" />
              <p>演示环境下使用规则引擎与示例证据，真实办理请复核最新公告。</p>
            </div>
            <SourceTags tags={helperTags} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
