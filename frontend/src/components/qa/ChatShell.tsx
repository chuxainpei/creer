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
    '可以直接提问三方协议、双选会、求职补贴、档案去向、简历投递等问题。我会优先返回学校就业中心官方资料，再在不冲突时补充经验参考。',
  status: 'done',
  sourceTags: [{ label: '官方优先', source_type: 'official' }],
  usedOfficial: true,
};

export default function ChatShell({ initialPrompts }: ChatShellProps) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const helperTags = useMemo(
    () => [
      { label: '官方优先', source_type: 'official' as const },
      { label: '经验补充', source_type: 'graduate_reference' as const },
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
      { id: assistantId, role: 'assistant', content: '', status: 'streaming', sourceTags: [] },
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
                    usedOfficial: metadata.used_official,
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
                  usedOfficial: fallback.used_official,
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
    <div className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
      <Card className="surface-grad inset-line overflow-hidden border-white/85">
        <CardHeader className="border-b border-border/70 bg-white/85">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="primary">官方优先</Badge>
            <Badge variant="secondary">流式回答</Badge>
          </div>
          <CardTitle className="text-2xl">就业中心智能问答</CardTitle>
          <CardDescription>先输出学校就业中心当前资料，再在不冲突时补充往届经验参考。</CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 p-5 sm:p-6">
          <div className="space-y-4 rounded-[1.5rem] border border-border/60 bg-white/86 p-4 sm:p-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={message.role === 'user' ? 'ml-auto flex max-w-[88%] items-start gap-3' : 'flex max-w-[90%] items-start gap-3'}
              >
                <div
                  className={
                    message.role === 'user'
                      ? 'order-2 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary/95 text-primary-foreground'
                      : 'flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary/10 text-primary'
                  }
                >
                  {message.role === 'user' ? <UserRound className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                </div>
                <div
                  className={
                    message.role === 'user'
                      ? 'order-1 rounded-[1.4rem] rounded-br-md bg-primary px-4 py-3 text-sm leading-7 text-primary-foreground'
                      : 'rounded-[1.4rem] rounded-bl-md border border-border/70 bg-white px-4 py-3 text-sm leading-7 text-foreground shadow-soft'
                  }
                >
                  {message.content || (
                    <span className="inline-flex items-center gap-2 text-muted-foreground">
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      正在整理回答…
                    </span>
                  )}
                </div>
                {message.role === 'assistant' && message.sourceTags?.length ? (
                  <div className="mt-3 space-y-2 pl-0">
                    <SourceTags tags={message.sourceTags} />
                    {message.usedOfficial ? (
                      <p className="text-xs text-muted-foreground">该回答已按官方资料优先策略生成。</p>
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
              placeholder="例如：三方协议怎么提交？双选会报名流程是什么？"
              rows={4}
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">涉及流程、材料、时间和政策时，系统默认优先返回官方资料。</p>
              <Button type="submit" className="gap-2 self-start sm:self-auto" disabled={isPending}>
                {isPending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <SendHorizonal className="h-4 w-4" />}
                发送问题
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <RecommendedQuestions questions={initialPrompts} onPick={(prompt) => void sendQuestion(prompt)} />
        <Card className="surface-grad border-white/85">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">回答逻辑</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
              <p>官方资料与经验参考冲突时，只输出官方结论。</p>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-4 w-4 text-warning" />
              <p>经验参考只在官方资料未覆盖时补充，不替代正式办理要求。</p>
            </div>
            <SourceTags tags={helperTags} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
