import { useState, useMemo } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { SearchBar } from './components/SearchBar';
import { ChatButton } from './components/ChatButton';
import { Phone, Wrench, FileText, BookOpen, Zap, Shield, Settings, Sun, Map } from 'lucide-react';
import { Logo } from './components/Logo';
import type { Article, Category } from './types';
import { getCustomerArticles, searchArticles, getArticlesByCategory, getArticleBySlug, getCategoryById, getRelatedArticles } from './data/kb';
import { data as kbData } from './data/kb';
import './App.css';

// Icon mapping for categories
const categoryIcons: Record<string, React.ReactNode> = {
  'finance-providers': <FileText size={24} />,
  'monitoring': <Settings size={24} />,
  'troubleshooting': <Wrench size={24} />,
  'customer-journey': <BookOpen size={24} />,
  'billing-production': <Zap size={24} />,
  'warranty-service': <Shield size={24} />,
  'solar-incentives': <Sun size={24} />,
  'state-utilities': <Map size={24} />,
};

// Home page - Palmetto-style
function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const articles = useMemo(() => getCustomerArticles(kbData.articles), []);

  const filteredArticles = useMemo(() => {
    if (!searchQuery) return [];
    return searchArticles(articles, searchQuery).slice(0, 5);
  }, [articles, searchQuery]);

  return (
    <div className="home-page">
      <div className="hero">
        <h1>How can we help?</h1>
        <div className="search-wrapper-large">
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery}
            placeholder="Search for answers..."
          />
        </div>
        
        {searchQuery && (
          <div className="search-results-dropdown">
            {filteredArticles.length > 0 ? (
              filteredArticles.map(article => (
                <Link key={article.id} to={`/article/${article.slug}`} className="search-result-item">
                  <span className="result-title">{article.title}</span>
                  <span className="result-category">{getCategoryById(kbData.categories, article.category_id)?.name}</span>
                </Link>
              ))
            ) : (
              <div className="no-results">No results found. Try asking in the chat.</div>
            )}
          </div>
        )}
      </div>

      <div className="collections-section">
        <div className="collections-grid">
          {kbData.categories.map(category => {
            const count = getArticlesByCategory(articles, category.id).length;
            return (
              <Link key={category.id} to={`/category/${category.id}`} className="collection-card">
                <div className="collection-icon">
                  {categoryIcons[category.id] || <BookOpen size={24} />}
                </div>
                <div className="collection-info">
                  <h3>{category.name}</h3>
                  <p className="article-count">{count} {count === 1 ? 'article' : 'articles'}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Category page
function Category() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const articles = useMemo(() => getCustomerArticles(kbData.articles), []);
  
  const category = getCategoryById(kbData.categories, categoryId!);
  const categoryArticles = getArticlesByCategory(articles, categoryId!);

  if (!category) return <div className="error">Category not found</div>;

  return (
    <div className="category-page">
      <div className="breadcrumbs">
        <Link to="/">Collections</Link>
        <span> / </span>
        <span>{category.name}</span>
      </div>
      
      <h1>{category.name}</h1>
      <p className="category-description">{category.description}</p>
      
      <div className="articles-list">
        {categoryArticles.map(article => (
          <Link key={article.id} to={`/article/${article.slug}`} className="article-row">
            <h3>{article.title}</h3>
            <span className="arrow">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Article page
function Article() {
  const { slug } = useParams<{ slug: string }>();
  const articles = useMemo(() => getCustomerArticles(kbData.articles), []);
  
  const article = getArticleBySlug(articles, slug!);
  if (!article) return <div className="error">Article not found</div>;

  const category = getCategoryById(kbData.categories, article.category_id);
  const relatedArticles = getRelatedArticles(articles, article.related_article_ids).slice(0, 3);

  return (
    <div className="article-page">
      <div className="breadcrumbs">
        <Link to="/">Collections</Link>
        {category && (
          <>
            <span> / </span>
            <Link to={`/category/${category.id}`}>{category.name}</Link>
          </>
        )}
        <span> / </span>
        <span>{article.title}</span>
      </div>

      <article className="article-content">
        <h1>{article.title}</h1>
        
        {article.content_chunks.map(chunk => (
          <div key={chunk.chunk_index} className="content-chunk">
            {chunk.content.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        ))}
      </article>

      {relatedArticles.length > 0 && (
        <aside className="related-articles">
          <h3>Related articles</h3>
          <div className="related-list">
            {relatedArticles.map(related => (
              <Link key={related.id} to={`/article/${related.slug}`} className="related-card">
                {related.title}
              </Link>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}

// Main App
function App() {
  return (
    <div className="app">
      <header className="main-header">
        <div className="header-content">
          <Link to="/" className="logo-link">
            <Logo size={32} />
            <span className="logo-help">Help Center</span>
          </Link>
          <nav className="header-nav">
            <a href="tel:800-203-4158" className="header-nav-link">
              <Phone size={16} />
              <span>800-203-4158</span>
            </a>
            <a href="https://venturehome.com/request-service" className="header-nav-link">
              Request Service
            </a>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<Category />} />
          <Route path="/article/:slug" element={<Article />} />
        </Routes>
      </main>

      <footer className="main-footer">
        <div className="footer-content">
          <p>© 2026 Venture Home Solar, LLC. All rights reserved.</p>
          <a href="https://venturehome.com">Back to venturehome.com</a>
        </div>
      </footer>

      <ChatButton />
    </div>
  );
}

export default App;