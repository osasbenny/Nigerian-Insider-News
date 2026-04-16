import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Static site - search disabled
  };

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Top Navigation */}
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">NIN</span>
          </div>
          <div className="hidden md:block">
            <h1 className="text-lg font-bold text-foreground">Nigerian Insider News</h1>
            <p className="text-xs text-muted-foreground">Premium News Platform</p>
          </div>
        </a>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <Search size={20} />
            </button>
          </div>
        </form>

        {/* Right Section - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="text-foreground hover:text-primary font-semibold transition-colors">
            Login
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Category Navigation - Desktop */}
      <div className="hidden md:block border-t border-border">
        <div className="container flex items-center gap-8 py-3 overflow-x-auto">
          {CATEGORIES.map((category) => (
            <a
              key={category.slug}
              href="#"
              className="text-foreground hover:text-primary font-medium whitespace-nowrap transition-colors"
            >
              {category.name}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            {/* Mobile Categories */}
            <div className="space-y-2">
              {CATEGORIES.map((category) => (
                <a
                  key={category.slug}
                  href="#"
                  className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                >
                  {category.name}
                </a>
              ))}
            </div>

            {/* Mobile Login */}
            <a
              href="#"
              className="block px-4 py-2 text-foreground hover:text-primary font-semibold transition-colors"
            >
              Login
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
