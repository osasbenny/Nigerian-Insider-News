import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import type { Article } from "../../../drizzle/schema";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const categoryColors: Record<string, string> = {
    politics: "bg-primary",
    business: "bg-secondary",
    sports: "bg-accent",
    entertainment: "bg-primary",
    technology: "bg-accent",
    world: "bg-secondary",
  };

  const categoryColor = categoryColors[article.category] || "bg-primary";

  return (
    <Link href={`/article/${article.slug}`}>
      <a className="article-card group">
        {article.coverImageUrl && (
          <div className="article-image overflow-hidden">
            <img
              src={article.coverImageUrl}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}
        <div className="article-content">
          <div className="flex items-center gap-2 mb-3">
            <span className={`badge-category ${categoryColor}`}>
              {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
            </span>
          </div>
          <h3 className="article-title">{article.title}</h3>
          <p className="article-excerpt">{article.excerpt}</p>
          <div className="article-meta">
            <span className="text-xs">{article.authorName}</span>
            <span className="text-xs">
              {formatDistanceToNow(new Date(article.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
}
