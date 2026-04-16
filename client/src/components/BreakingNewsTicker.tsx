import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import type { Article } from "../../../drizzle/schema";

interface BreakingNewsTickerProps {
  articles: Article[];
}

export default function BreakingNewsTicker({ articles }: BreakingNewsTickerProps) {
  const [displayArticles, setDisplayArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (articles && articles.length > 0) {
      // Duplicate articles for seamless scrolling
      setDisplayArticles([...articles, ...articles]);
    }
  }, [articles]);

  if (!articles || articles.length === 0) return null;

  return (
    <div className="breaking-news-ticker">
      <div className="container flex items-center gap-4">
        <div className="ticker-label flex-shrink-0">
          <AlertCircle size={18} />
          <span>BREAKING</span>
        </div>
        <div className="ticker-content">
          {displayArticles && displayArticles.length > 0 && displayArticles.map((article, idx) => (
            <a key={`${article.id}-${idx}`} href="#" className="ticker-item hover:text-secondary transition-colors">
              {article.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
