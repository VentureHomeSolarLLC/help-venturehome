export interface Category {
  id: string;
  name: string;
  description: string;
  sort_order: number;
}

export interface ContentChunk {
  chunk_index: number;
  content: string;
  tokens: number;
}

export interface Article {
  id: string;
  slug: string;
  category_id: string;
  title: string;
  tags: string[];
  visibility: 'customer' | 'internal' | 'both';
  question_aliases: string[];
  content_chunks: ContentChunk[];
  related_article_ids: string[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface KBData {
  metadata: {
    version: string;
    created: string;
    total_articles: number;
    total_categories: number;
  };
  categories: Category[];
  articles: Article[];
}