import { useRoute } from "wouter";
import { Link } from "wouter";
import { Share2, Facebook, Twitter, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import ArticleCard from "@/components/ArticleCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";

export default function Article() {
  const [match, params] = useRoute("/article/:slug");
  const slug = params?.slug as string;

  const { data: article, isLoading } = trpc.articles.getBySlug.useQuery({ slug });
  const { data: relatedArticles } = trpc.articles.getRelated.useQuery(
    {
      category: article?.category || "",
      currentSlug: slug,
      limit: 3,
    },
    { enabled: !!article }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="container py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-96 bg-muted rounded-lg" />
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="container py-12 flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
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

  const shareUrl = `${window.location.origin}/article/${article.slug}`;
  const shareText = `${article.title} - Nigerian Insider News`;

  const handleShare = (platform: string) => {
    let url = "";
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case "whatsapp":
        url = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
        return;
    }
    if (url) window.open(url, "_blank", "width=600,height=400");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Article Header */}
        <article className="container py-8 md:py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/">
              <a className="hover:text-primary">Home</a>
            </Link>
            <span>/</span>
            <Link href={`/category/${article.category}`}>
              <a className="hover:text-primary capitalize">{article.category}</a>
            </Link>
            <span>/</span>
            <span className="text-foreground">{article.title.substring(0, 50)}...</span>
          </div>

          {/* Category Badge */}
          <div className="mb-4">
            <span className="badge-category bg-primary text-primary-foreground capitalize">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                {article.authorName.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-foreground">{article.authorName}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(article.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-muted-foreground">Share:</span>
              <button
                onClick={() => handleShare("twitter")}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                title="Share on Twitter"
              >
                <Twitter size={18} />
              </button>
              <button
                onClick={() => handleShare("facebook")}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                title="Share on Facebook"
              >
                <Facebook size={18} />
              </button>
              <button
                onClick={() => handleShare("whatsapp")}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                title="Share on WhatsApp"
              >
                <MessageCircle size={18} />
              </button>
              <button
                onClick={() => handleShare("copy")}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                title="Copy link"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>

          {/* Featured Image */}
          {article.coverImageUrl && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={article.coverImageUrl}
                alt={article.title}
                className="w-full h-96 md:h-[500px] object-cover"
              />
            </div>
          )}

          {/* Excerpt */}
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Content */}
          <div className="prose prose-invert max-w-none mb-12">
            <div className="text-foreground leading-relaxed whitespace-pre-wrap">
              {article.content}
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles && relatedArticles.length > 0 && (
          <section className="container py-12 border-t border-border">
            <h2 className="text-3xl font-bold mb-8 text-foreground">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
