export type SourceType =
  | 'official'
  | 'graduate_reference'
  | 'admission_reference'
  | 'job_market_signal'
  | 'model_rule';

export interface SourceTag {
  label: string;
  source_type: SourceType;
}

export interface SourceEvidence {
  source_type: SourceType;
  source_name: string;
  snippet: string;
}

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface RecommendationCard {
  id: string;
  title: string;
  fit_reason: string;
  action: string;
  risk_hint: string;
  confidence: ConfidenceLevel;
}

export interface CredibilityItem {
  label: string;
  detail: string;
  level: 'official' | 'cross_check' | 'experience';
}

export interface AskRequest {
  question: string;
}

export interface AskResponse {
  answer: string;
  source_tags: SourceTag[];
  evidence: SourceEvidence[];
  used_official: boolean;
  recommendations?: RecommendationCard[];
  credibility?: CredibilityItem[];
  response_mode?: 'concise_recommendation';
}

export interface StreamMetadata {
  source_tags: SourceTag[];
  evidence: SourceEvidence[];
  used_official: boolean;
  recommendations?: RecommendationCard[];
  credibility?: CredibilityItem[];
  response_mode?: 'concise_recommendation';
}

export type MessageRole = 'user' | 'assistant';
export type MessageStatus = 'streaming' | 'done' | 'error';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  status: MessageStatus;
  sourceTags?: SourceTag[];
  evidence?: SourceEvidence[];
  usedOfficial?: boolean;
  recommendations?: RecommendationCard[];
  credibility?: CredibilityItem[];
  responseMode?: 'concise_recommendation';
}

export interface AdminStatus {
  ok: boolean;
  official_files: number;
  graduate_files: number;
  official_chunks: number;
  graduate_chunks: number;
  last_reindexed: string | null;
  skipped_files: Array<{ file: string; reason: string }>;
}
