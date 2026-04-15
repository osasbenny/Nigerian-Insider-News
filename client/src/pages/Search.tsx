import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import ArticleCard from "@/components/ArticleCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Search() {
  const [location] = useLocation();
  const [query, setQuery] = useState("");
  const [allArticles, setAllArticles] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(location.split("?")[1]);
    const searchQuery = params.get("q") || "";
    setQuery(searchQuery);
    setOffset(0);
    setAllArticles([]);
  }, [location]);

  const { data: articles, isLoading } = trpc.articles.search.useQuery(
    {
      query,
      limit: 12,
      offset,
    },
    { enabled: !!query }
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Search Header */}
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Search Results
            </h1>
            <p className="text-lg text-primary-foreground/80">
              {query ? `Results for "${query}"` : "Enter a search query"}
            </p>
          </div>
        </section>

        {/* Results */}
        <section className="container py-12">
          {!query ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">No search query</h2>
              <p className="text-muted-foreground mb-6">
                Please enter a search query to find articles.
              </p>
              <Link href="/">
                <a>
                  <Button>Back to Home</Button>
                </a>
              </Link>
            </div>
          ) : isLoading && allArticles.length === 0 ? (
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
              <div className="mb-6 text-sm text-muted-foreground">
                Found {allArticles.length} article{allArticles.length !== 1 ? "s" : ""}
              </div>
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
                    {isLoading ? "Loading..." : "Load More Results"}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">No results found</h2>
              <p className="text-muted-foreground mb-6">
                No articles match your search query. Try different keywords.
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
