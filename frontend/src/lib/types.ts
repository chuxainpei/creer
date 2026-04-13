export type SourceType = 'official' | 'graduate_reference';

export interface SourceTag {
  label: string;
  source_type: SourceType;
}

export interface SourceEvidence {
  source_type: SourceType;
  source_name: string;
  snippet: string;
}

export interface AskRequest {
  question: string;
}

export interface AskResponse {
  answer: string;
  source_tags: SourceTag[];
  evidence: SourceEvidence[];
  used_official: boolean;
}

export interface StreamMetadata {
  source_tags: SourceTag[];
  evidence: SourceEvidence[];
  used_official: boolean;
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
