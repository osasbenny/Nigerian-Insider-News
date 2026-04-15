import { useRoute } from "wouter";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import ArticleCard from "@/components/ArticleCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const CATEGORY_NAMES: Record<string, string> = {
  politics: "Politics",
  business: "Business",
  sports: "Sports",
  entertainment: "Entertainment",
  technology: "Technology",
  world: "World",
};

export default function Category() {
  const [match, params] = useRoute("/category/:slug");
  const category = params?.slug as string;
  const [offset, setOffset] = useState(0);
  const [allArticles, setAllArticles] = useState<any[]>([]);

  const { data: articles, isLoading } = trpc.articles.getByCategory.useQuery(
    {
      category,
      limit: 12,
      offset,
    },
    { enabled: !!category }
  );

  useEffect(() => {
    if (articles) {
      if (offset === 0) {
        setAllArticles(articles);
      } else {
        setAllArticles((prev) => [...prev, ...articles]);
      }
    }
  }, [articles, offset]);

  const handleLoadMore = () => {
    setOffset((prev) => prev + 12);
  };

  if (!category || !CATEGORY_NAMES[category]) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="container py-12 flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
            <p className="text-muted-foreground mb-6">The category you're looking for doesn't exist.</p>
            <Link href="/">
              <a>
                <Button>Back to Home</Button>
              </a>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Category Header */}
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {CATEGORY_NAMES[category]}
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Latest news and updates from the {CATEGORY_NAMES[category].toLowerCase()} section
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="container py-12">
          {isLoading && allArticles.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-56 bg-muted rounded-lg mb-4" />
                  <div className="h-6 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded" />
                </div>
              ))}
            </div>
          ) : allArticles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {allArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

              {/* Load More Button */}
              {articles && articles.length === 12 && (
                <div className="text-center">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleLoadMore}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Load More Articles"}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">No articles found</h2>
              <p className="text-muted-foreground mb-6">
                There are no articles in this category yet.
              </p>
              <Link href="/">
                <a>
                  <Button>Back to Home</Button>
                </a>
              </Link>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
