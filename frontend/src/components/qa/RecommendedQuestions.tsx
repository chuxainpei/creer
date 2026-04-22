import { ArrowUpRight } from 'lucide-react';

interface RecommendedQuestionsProps {
  questions: string[];
  onPick?: (question: string) => void;
}

export default function RecommendedQuestions({ questions, onPick }: RecommendedQuestionsProps) {
  return (
    <div className="tabbit-frame p-4 sm:p-5">
      <div className="border-b border-[rgba(17,24,39,0.06)] pb-3">
        <p className="text-sm font-semibold text-foreground">高频决策问题</p>
      </div>
      <div className="grid gap-3 pt-4 sm:grid-cols-2">
        {questions.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => onPick?.(question)}
            className="group flex items-center justify-between rounded-[1.3rem] border border-[rgba(17,24,39,0.06)] bg-white px-4 py-3 text-left transition hover:-translate-y-0.5 hover:border-primary/20 hover:bg-primary/5"
          >
            <span className="text-sm font-medium text-foreground">{question}</span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
          </button>
        ))}
      </div>
    </div>
  );
}
