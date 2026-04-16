import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setIsSubscribing(true);
    // Simulate subscription
    setTimeout(() => {
      toast.success("Thank you for subscribing!");
      setEmail("");
      setIsSubscribing(false);
    }, 1000);
  };

  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">Nigerian Insider News</h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Premium news platform delivering breaking news, in-depth analysis, and exclusive stories from Nigeria and beyond.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-secondary transition-colors">Politics</a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">Business</a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">Sports</a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">Entertainment</a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">Technology</a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">World</a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-secondary transition-colors">Home</a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">Contact</a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-sm text-primary-foreground/80 mb-3">
              Subscribe to get the latest news delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <Button
                type="submit"
                disabled={isSubscribing}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                size="sm"
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 py-8">
          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <a href="#" className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors">
              <Mail size={20} />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-primary-foreground/70">
            <p>&copy; 2026 Nigerian Insider News. All rights reserved.</p>
            <p className="mt-2 text-xs text-primary-foreground/60">
              Designed by{" "}
              <a
                href="https://instagram.com/osas.codes"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors font-semibold"
              >
                Osagie Bernard Ebhuomhan
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
