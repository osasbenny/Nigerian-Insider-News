import { useState } from "react";
import { Link } from "wouter";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const CATEGORIES = [
  { name: "Politics", slug: "politics" },
  { name: "Business", slug: "business" },
  { name: "Sports", slug: "sports" },
  { name: "Entertainment", slug: "entertainment" },
  { name: "Technology", slug: "technology" },
  { name: "World", slug: "world" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Top Navigation */}
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">NIN</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-foreground">Nigerian Insider News</h1>
              <p className="text-xs text-muted-foreground">Premium News Platform</p>
            </div>
          </a>
        </Link>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Admin Link */}
          {user?.role === "admin" && (
            <Link href="/admin">
              <a className="text-sm font-semibold text-primary hover:text-accent hidden md:inline">
                Admin
              </a>
            </Link>
          )}

          {/* Auth Buttons */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden md:inline">{user.name}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logout()}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={() => (window.location.href = getLoginUrl())}
            >
              Login
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="border-t border-border">
        <div className="container">
          <div className={`flex flex-col md:flex-row md:items-center gap-2 md:gap-6 py-3 ${isMenuOpen ? "block" : "hidden md:flex"}`}>
            {CATEGORIES.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2 md:py-0">
                  {category.name}
                </a>
              </Link>
            ))}

            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="md:hidden mt-3 pb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  <Search size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
