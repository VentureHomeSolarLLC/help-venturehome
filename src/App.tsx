import { Routes, Route, Link, useParams } from 'react-router-dom';
import { SearchBar } from './components/SearchBar';
import { ChatButton } from './components/ChatButton';
import { useState, useEffect, useMemo } from 'react';
import type { Article, Category } from './types';
import { loadKBData, getCustomerArticles, searchArticles, getArticlesByCategory, getArticleBySlug, getCategoryById, getRelatedArticles } from './data/kb';
import './App.css';

// Home page
function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [kbData, setKbData] = useState<{ categories: Category[]; articles: Article[] } | null>(null);

  useEffect(() => {
    loadKBData().then(data => {
      setKbData({
        categories: data.categories,
        articles: getCustomerArticles(data.articles)
      });
    });
  }, []);

  const filteredArticles = useMemo(() => {
    if (!kbData || !searchQuery) return [];
    return searchArticles(kbData.articles, searchQuery).slice(0, 5);
  }, [kbData, searchQuery]);

  if (!kbData) return <div className="loading">Loading...</div>;

  return (
    <div className="home-page">
      <div className="hero">
        <h1>How can we help?</h1>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        
        {searchQuery && (
          <div className="search-results">
            {filteredArticles.length > 0 ? (
              filteredArticles.map(article => (
                <Link key={article.id} to={`/article/${article.slug}`} className="result-card">
                  <h3>{article.title}</h3>
                  <p>{article.tags.join(', ')}</p>
                </Link>
              ))
            ) : (
              <p className="no-results">No results found. Try asking in the chat.</p>
            )}
          </div>
        )}
      </div>

      <div className="categories-grid">
        <h2>Browse by category</h2>
        <div className="grid">
          {kbData.categories.map(category => {
            const count = getArticlesByCategory(kbData.articles, category.id).length;
            return (
              <Link key={category.id} to={`/category/${category.id}`} className="category-card">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <span className="article-count">{count} articles</span>
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
  const [kbData, setKbData] = useState<{ categories: Category[]; articles: Article[] } | null>(null);

  useEffect(() => {
    loadKBData().then(data => {
      setKbData({
        categories: data.categories,
        articles: getCustomerArticles(data.articles)
      });
    });
  }, []);

  if (!kbData) return <div className="loading">Loading...</div>;

  const category = getCategoryById(kbData.categories, categoryId!);
  const articles = getArticlesByCategory(kbData.articles, categoryId!);

  if (!category) return <div className="error">Category not found</div>;

  return (
    <div className="category-page">
      <h1>{category.name}</h1>
      <p className="category-description">{category.description}</p>
      
      <div className="articles-list">
        {articles.map(article => (
          <Link key={article.id} to={`/article/${article.slug}`} className="article-card">
            <h3>{article.title}</h3>
            <p>{article.tags.slice(0, 3).join(', ')}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Article page
function Article() {
  const { slug } = useParams<{ slug: string }>();
  const [kbData, setKbData] = useState<{ categories: Category[]; articles: Article[] } | null>(null);

  useEffect(() => {
    loadKBData().then(data => {
      setKbData({
        categories: data.categories,
        articles: getCustomerArticles(data.articles)
      });
    });
  }, []);

  if (!kbData) return <div className="loading">Loading...</div>;

  const article = getArticleBySlug(kbData.articles, slug!);
  if (!article) return <div className="error">Article not found</div>;

  const category = getCategoryById(kbData.categories, article.category_id);
  const relatedArticles = getRelatedArticles(kbData.articles, article.related_article_ids);

  return (
    <div className="article-page">
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <span> / </span>
        {category && <Link to={`/category/${category.id}`}>{category.name}</Link>}
        <span> / </span>
        <span>{article.title}</span>
      </div>

      <article className="article-content">
        <h1>{article.title}</h1>
        
        <div className="tags">
          {article.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

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
          <ul>
            {relatedArticles.map(related => (
              <li key={related.id}>
                <Link to={`/article/${related.slug}`}>{related.title}</Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}

// Main App
function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-vh">Venture Home</span>
            <span className="logo-help">Help Center</span>
          </Link>
          <nav className="nav">
            <a href="https://venturehome.com" target="_blank" rel="noopener">Back to site</a>
          </nav>
        </div>
      </header>

      <div className="main-container">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <Link to="/" className="nav-link">All articles</Link>
            <hr />
            {/* Categories loaded dynamically */}
          </nav>
        </aside>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<Category />} />
            <Route path="/article/:slug" element={<Article />} />
          </Routes>
        </main>
      </div>

      <ChatButton />
    </div>
  );
}

export default App;