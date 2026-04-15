import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import ArticleCard from "@/components/ArticleCard";
import Navigation from "@/components/Navigation";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import Footer from "@/components/Footer";

const CATEGORIES = [
  { name: "Politics", slug: "politics" },
  { name: "Business", slug: "business" },
  { name: "Sports", slug: "sports" },
  { name: "Entertainment", slug: "entertainment" },
  { name: "Technology", slug: "technology" },
  { name: "World", slug: "world" },
];

export default function Home() {
  const { data: articles, isLoading } = trpc.articles.list.useQuery({ limit: 20 });
  const [featuredArticle, setFeaturedArticle] = useState<any>();
  const [latestArticles, setLatestArticles] = useState<any[]>([]);

  useEffect(() => {
    if (articles && articles.length > 0) {
      setFeaturedArticle(articles[0]);
      setLatestArticles(articles.slice(1));
    }
  }, [articles]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <BreakingNewsTicker />

      <main className="flex-1">
        {/* Hero Section with Featured Article */}
        {featuredArticle && (
          <section className="container py-8 md:py-12">
            <Link href={`/article/${featuredArticle.slug}`}>
              <a className="group block">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  {/* Featured Image */}
                  <div className="md:col-span-2 overflow-hidden rounded-lg">
                    {featuredArticle.coverImageUrl && (
                      <img
                        src={featuredArticle.coverImageUrl}
                        alt={featuredArticle.title}
                        className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>

                  {/* Featured Content */}
                  <div className="md:col-span-1 flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="badge-category bg-secondary text-secondary-foreground">
                        Featured
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{featuredArticle.authorName}</span>
                      <span>•</span>
                      <span>{new Date(featuredArticle.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          </section>
        )}

        {/* Category Sections */}
        {CATEGORIES.map((category) => {
          const categoryArticles = latestArticles.filter(
            (a) => a.category === category.slug
          ).slice(0, 3);

          if (categoryArticles.length === 0) return null;

          return (
            <section key={category.slug} className="container py-12 border-t border-border">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-foreground">{category.name}</h2>
                <Link href={`/category/${category.slug}`}>
                  <a className="flex items-center gap-2 text-primary hover:text-accent transition-colors font-semibold">
                    View All
                    <ChevronRight size={20} />
                  </a>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          );
        })}

        {/* Load More Button */}
        {latestArticles.length > 0 && (
          <section className="container py-12 text-center">
            <Link href="/latest">
              <a>
                <Button size="lg" variant="outline">
                  Load More Articles
                </Button>
              </a>
            </Link>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
