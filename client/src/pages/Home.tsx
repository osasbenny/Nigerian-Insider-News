import Navigation from "@/components/Navigation";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import ArticleCard from "@/components/ArticleCard";
import Footer from "@/components/Footer";
import type { Article } from "../../../drizzle/schema";

// Static article data - pre-rendered for static site
const FEATURED_ARTICLE: Article = {
  id: 1,
  title: "Nigerian Stock Exchange Hits Record High as Foreign Investors Return",
  slug: "nigerian-stock-exchange-record-high",
  excerpt: "The NSE All-Share Index reaches unprecedented levels amid renewed investor confidence and improved economic outlook.",
  content: "The Nigerian Stock Exchange (NSE) has achieved a historic milestone as the All-Share Index surged to record highs, driven by renewed foreign investor interest and positive economic indicators. Market analysts attribute the surge to improved macroeconomic fundamentals, including stabilized exchange rates and increased corporate earnings. Major sectors including banking, telecommunications, and consumer goods have led the rally. Institutional investors have significantly increased their portfolio allocations to Nigerian equities, citing attractive valuations and long-term growth potential. The NSE has recorded over 2.5 trillion naira in market capitalization, reflecting strong investor confidence in the Nigerian economy.",
  category: "business",
  coverImageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop",
  authorName: "Amara Nwosu",
  published: true,
  createdAt: new Date("2026-04-15"),
  updatedAt: new Date("2026-04-15"),
};

const BREAKING_NEWS: Article[] = [
  {
    id: 101,
    title: "Investment Summit Attracts Global Finance Leaders to Lagos",
    slug: "investment-summit",
    excerpt: "Investment Summit",
    content: "",
    category: "business",
    coverImageUrl: null,
    authorName: "",
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 102,
    title: "Super Eagles Secure Qualification to Africa Cup of Nations Final Tournament",
    slug: "super-eagles",
    excerpt: "Super Eagles",
    content: "",
    category: "sports",
    coverImageUrl: null,
    authorName: "",
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 103,
    title: "Nollywood Breaks Box Office Records with New Blockbuster Film",
    slug: "nollywood-records",
    excerpt: "Nollywood",
    content: "",
    category: "entertainment",
    coverImageUrl: null,
    authorName: "",
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 104,
    title: "Nigeria's Tech Sector Attracts Record Venture Capital Funding",
    slug: "tech-funding",
    excerpt: "Tech Sector",
    content: "",
    category: "technology",
    coverImageUrl: null,
    authorName: "",
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const CATEGORIES_DATA: Array<{ name: string; category: "politics" | "business" | "sports" | "entertainment" | "technology" | "world"; articles: Article[] }> = [
  {
    name: "Politics",
    category: "politics",
    articles: [
      {
        id: 2,
        title: "Government Announces New Economic Reform Package",
        slug: "government-economic-reform",
        excerpt: "Federal government unveils comprehensive economic reform initiatives aimed at boosting growth and employment.",
        content: "",
        category: "politics",
        coverImageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
        authorName: "Chioma Okafor",
        published: true,
        createdAt: new Date("2026-04-14"),
        updatedAt: new Date("2026-04-14"),
      },
      {
        id: 3,
        title: "National Assembly Passes Critical Infrastructure Bill",
        slug: "assembly-infrastructure-bill",
        excerpt: "Lawmakers approve landmark legislation to accelerate infrastructure development across the nation.",
        content: "",
        category: "politics",
        coverImageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
        authorName: "Emeka Eze",
        published: true,
        createdAt: new Date("2026-04-13"),
        updatedAt: new Date("2026-04-13"),
      },
    ],
  },
  {
    name: "Business",
    category: "business",
    articles: [
      {
        id: 4,
        title: "Tech Startup Raises $50 Million in Series B Funding",
        slug: "tech-startup-funding",
        excerpt: "Lagos-based fintech company secures major investment round from international venture capital firms.",
        content: "",
        category: "business",
        coverImageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
        authorName: "Tunde Oladele",
        published: true,
        createdAt: new Date("2026-04-14"),
        updatedAt: new Date("2026-04-14"),
      },
      {
        id: 5,
        title: "Manufacturing Sector Shows Strong Recovery",
        slug: "manufacturing-recovery",
        excerpt: "Industrial output increases as businesses adapt to new market conditions and consumer demand rebounds.",
        content: "",
        category: "business",
        coverImageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
        authorName: "Folake Adeyemi",
        published: true,
        createdAt: new Date("2026-04-13"),
        updatedAt: new Date("2026-04-13"),
      },
    ],
  },
  {
    name: "Sports",
    category: "sports",
    articles: [
      {
        id: 6,
        title: "Super Eagles Prepare for International Tournament",
        slug: "super-eagles-tournament",
        excerpt: "National football team intensifies training ahead of continental championship competition.",
        content: "",
        category: "sports",
        coverImageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
        authorName: "Kunle Adebayo",
        published: true,
        createdAt: new Date("2026-04-14"),
        updatedAt: new Date("2026-04-14"),
      },
      {
        id: 7,
        title: "Nigerian Boxer Claims Continental Title",
        slug: "nigerian-boxer-title",
        excerpt: "Rising boxing star captures heavyweight championship in thrilling match at Lagos arena.",
        content: "",
        category: "sports",
        coverImageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
        authorName: "Segun Okonkwo",
        published: true,
        createdAt: new Date("2026-04-12"),
        updatedAt: new Date("2026-04-12"),
      },
    ],
  },
  {
    name: "Entertainment",
    category: "entertainment",
    articles: [
      {
        id: 8,
        title: "Nollywood Film Wins International Award",
        slug: "nollywood-award",
        excerpt: "Nigerian cinema achieves global recognition as acclaimed film takes top prize at prestigious festival.",
        content: "",
        category: "entertainment",
        coverImageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=300&fit=crop",
        authorName: "Zainab Hassan",
        published: true,
        createdAt: new Date("2026-04-14"),
        updatedAt: new Date("2026-04-14"),
      },
      {
        id: 9,
        title: "Music Industry Celebrates Record-Breaking Concert",
        slug: "music-concert-record",
        excerpt: "Afrobeats festival draws massive crowds and sets new attendance records for live entertainment.",
        content: "",
        category: "entertainment",
        coverImageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=300&fit=crop",
        authorName: "Ade Ogunlade",
        published: true,
        createdAt: new Date("2026-04-13"),
        updatedAt: new Date("2026-04-13"),
      },
    ],
  },
  {
    name: "Technology",
    category: "technology",
    articles: [
      {
        id: 10,
        title: "Nigeria Launches Digital Innovation Hub",
        slug: "digital-innovation-hub",
        excerpt: "Government establishes state-of-the-art technology center to foster startup ecosystem growth.",
        content: "",
        category: "technology",
        coverImageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
        authorName: "Chidi Nwankwo",
        published: true,
        createdAt: new Date("2026-04-14"),
        updatedAt: new Date("2026-04-14"),
      },
      {
        id: 11,
        title: "Cybersecurity Firm Expands African Operations",
        slug: "cybersecurity-expansion",
        excerpt: "International security company opens regional headquarters in Nigeria to serve growing market.",
        content: "",
        category: "technology",
        coverImageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
        authorName: "Ngozi Obi",
        published: true,
        createdAt: new Date("2026-04-12"),
        updatedAt: new Date("2026-04-12"),
      },
    ],
  },
  {
    name: "World",
    category: "world",
    articles: [
      {
        id: 12,
        title: "Global Economic Forum Highlights African Growth",
        slug: "global-forum-africa",
        excerpt: "International leaders discuss opportunities and challenges for African economies in rapidly changing world.",
        content: "",
        category: "world",
        coverImageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
        authorName: "Amina Suleiman",
        published: true,
        createdAt: new Date("2026-04-14"),
        updatedAt: new Date("2026-04-14"),
      },
      {
        id: 13,
        title: "International Trade Agreement Benefits Nigeria",
        slug: "trade-agreement",
        excerpt: "New bilateral trade deal opens markets and creates opportunities for Nigerian exporters.",
        content: "",
        category: "world",
        coverImageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
        authorName: "Ibrahim Adeyemi",
        published: true,
        createdAt: new Date("2026-04-13"),
        updatedAt: new Date("2026-04-13"),
      },
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <BreakingNewsTicker articles={BREAKING_NEWS} />

      <main className="flex-1">
        {/* Hero Section - Featured Article */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <div className="mb-4 flex items-center gap-2">
                  <span className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 leading-tight">
                  {FEATURED_ARTICLE.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {FEATURED_ARTICLE.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="font-semibold">{FEATURED_ARTICLE.authorName}</span>
                  <span>•</span>
                  <span>{FEATURED_ARTICLE.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
              <div className="lg:col-span-1">
                <img
                  src={FEATURED_ARTICLE.coverImageUrl || ""}
                  alt={FEATURED_ARTICLE.title}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Sections */}
        {CATEGORIES_DATA.map((categoryData) => (
          <section key={categoryData.category} className="py-12 border-b border-border">
            <div className="container">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
                  {categoryData.name}
                </h2>
                <a
                  href="#"
                  className="text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  View All →
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryData.articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
