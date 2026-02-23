import type { KBData, Article, Category } from '../types';

// Load KB content from helios-kb repo
// In production, this would be fetched from the JSON file
const kbContent: KBData = {
  "metadata": {
    "version": "1.0",
    "created": "2026-02-23",
    "total_articles": 30,
    "total_categories": 6
  },
  "categories": [
    {
      "id": "finance-providers",
      "name": "Finance Providers",
      "description": "Billing, contacts, and transfer information",
      "sort_order": 1
    },
    {
      "id": "monitoring",
      "name": "System Monitoring",
      "description": "How to monitor your solar system",
      "sort_order": 2
    },
    {
      "id": "troubleshooting",
      "name": "Troubleshooting",
      "description": "Common issues and solutions",
      "sort_order": 3
    },
    {
      "id": "customer-journey",
      "name": "Your Solar Journey",
      "description": "From signing to going live",
      "sort_order": 4
    },
    {
      "id": "billing-production",
      "name": "Billing & Production",
      "description": "Understanding your bill and system performance",
      "sort_order": 5
    },
    {
      "id": "warranty-service",
      "name": "Warranty & Service",
      "description": "What's covered and how to get help",
      "sort_order": 6
    }
  ],
  "articles": []
};

// Fetch full content from JSON file
export async function loadKBData(): Promise<KBData> {
  try {
    const response = await fetch('/kb-content.json');
    if (!response.ok) throw new Error('Failed to load KB content');
    return await response.json();
  } catch (error) {
    console.warn('Using fallback KB data:', error);
    return kbContent;
  }
}

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