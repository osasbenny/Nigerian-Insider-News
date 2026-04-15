import { useEffect, useState } from "react";
import { Link } from "wouter";
import { AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function BreakingNewsTicker() {
  const { data: articles } = trpc.articles.list.useQuery({ limit: 10 });
  const [displayArticles, setDisplayArticles] = useState<typeof articles>([]);

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
            <Link key={`${article.id}-${idx}`} href={`/article/${article.slug}`}>
              <a className="ticker-item hover:text-secondary transition-colors">
                {article.title}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
