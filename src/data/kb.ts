import type { KBData, Article, Category } from '../types';
import kbContent from '../../public/kb-content.json';

// Use the imported JSON as the primary data source
// This works in both dev and production since kb-content.json is in public/
const data: KBData = kbContent as KBData;

export function getCustomerArticles(articles: Article[]): Article[] {
  return articles.filter(a => a.visibility === 'customer' || a.visibility === 'both');
}

export function searchArticles(articles: Article[], query: string): Article[] {
  const lowerQuery = query.toLowerCase();
  return articles.filter(article => {
    const inTitle = article.title.toLowerCase().includes(lowerQuery);
    const inTags = article.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
    const inAliases = article.question_aliases.some(alias => alias.toLowerCase().includes(lowerQuery));
    return inTitle || inTags || inAliases;
  });
}

export function getArticlesByCategory(articles: Article[], categoryId: string): Article[] {
  return articles.filter(a => a.category_id === categoryId);
}

export function getArticleBySlug(articles: Article[], slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}

export function getCategoryById(categories: Category[], id: string): Category | undefined {
  return categories.find(c => c.id === id);
}

export function getRelatedArticles(articles: Article[], relatedIds: string[]): Article[] {
  return relatedIds.map(id => articles.find(a => a.id === id)).filter(Boolean) as Article[];
}

export function loadKBData(): Promise<KBData> {
  // Return the imported data directly
  return Promise.resolve(data);
}

export { data };