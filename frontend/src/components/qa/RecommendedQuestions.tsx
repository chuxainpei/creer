import { ArrowUpRight } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';

interface RecommendedQuestionsProps {
  questions: string[];
  onPick?: (question: string) => void;
}

export default function RecommendedQuestions({ questions, onPick }: RecommendedQuestionsProps) {
  return (
    <Card className="surface-grad border-white/85">
      <CardHeader className="pb-4">
        <CardTitle className="text-base">高频就业主题</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        {questions.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => onPick?.(question)}
            className="group flex items-center justify-between rounded-[1.25rem] border border-border/80 bg-white/85 px-4 py-3 text-left transition hover:-translate-y-0.5 hover:border-primary/20 hover:bg-primary/5"
          >
            <span className="text-sm font-medium text-foreground">{question}</span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
