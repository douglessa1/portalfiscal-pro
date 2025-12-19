export interface NewsArticle {
  title: string;
  summary: string;
  source: string;
  url?: string;
  date: string;
  isCustom?: boolean;
}

export interface Source {
  title: string;
  url: string;
  sourceType?: string;
  snippet?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
  groundingSources?: { title: string; url: string }[];
}

export enum TaxCategory {
  FEDERAL = 'Federal',
  ESTADUAL = 'Estadual',
  MUNICIPAL = 'Municipal',
  IRPF = 'IRPF',
  EMPRESARIAL = 'Empresarial'
}

export type AspectRatio = "1:1" | "2:3" | "3:2" | "3:4" | "4:3" | "9:16" | "16:9" | "21:9";

export interface GeneratedImage {
  url: string;
  prompt: string;
  aspectRatio: AspectRatio;
}