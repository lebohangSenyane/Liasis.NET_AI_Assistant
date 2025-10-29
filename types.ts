export interface GenerationParams {
  type: string;
  genre: string;
  tone: string;
  length: string;
  customTitle?: string;
  customPrompt?: string;
}

export interface GenerationResult {
  id: string;
  title: string;
  content: string;
  summary: string;
  metadata: {
    params: GenerationParams;
    type: string;
    genre: string;
    tone: string;
    wordCount: string;
    tokenUsage: number | string;
    generationTime: number;
  };
}