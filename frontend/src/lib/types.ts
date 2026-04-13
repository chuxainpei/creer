export type SourceType = 'official' | 'graduate_reference';

export interface SourceTag {
  label: string;
  source_type: SourceType;
}

export interface AskRequest {
  question: string;
}

export interface AskResponse {
  answer: string;
  source_tags: SourceTag[];
  used_official: boolean;
}
