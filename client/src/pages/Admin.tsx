import { useState } from "react";
import { Link } from "wouter";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";

export default function Admin() {
  const { user } = useAuth();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "politics" as const,
    coverImageUrl: "",
    authorName: "",
    published: false,
  });

  const { data: articles, refetch } = trpc.articles.listAll.useQuery({ limit: 100 });
  const createMutation = trpc.articles.create.useMutation();
  const updateMutation = trpc.articles.update.useMutation();
  const deleteMutation = trpc.articles.delete.useMutation();

  // Redirect if not admin
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="container py-12 flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
            <p className="text-muted-foreground mb-6">You need admin access to view this page.</p>
            <Button onClick={() => (window.location.href = getLoginUrl())}>
              Login as Admin
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          ...formData,
        });
        toast.success("Article updated successfully!");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("Article created successfully!");
      }

      setFormData({
        title: "",
        excerpt: "",
        content: "",
        category: "politics",
        coverImageUrl: "",
        authorName: "",
        published: false,
      });
      setEditingId(null);
      refetch();
    } catch (error) {
      toast.error("Error saving article");
    }
  };

  const handleEdit = (article: any) => {
    setEditingId(article.id);
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      coverImageUrl: article.coverImageUrl || "",
      authorName: article.authorName,
      published: article.published,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteMutation.mutateAsync({ id });
        toast.success("Article deleted successfully!");
        refetch();
      } catch (error) {
        toast.error("Error deleting article");
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "politics",
      coverImageUrl: "",
      authorName: "",
      published: false,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 container py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your news articles</p>
        </div>

        {/* Form Section */}
        <div className="bg-background border border-border rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {editingId ? "Edit Article" : "Create New Article"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Article title"
                />
              </div>

              {/* Excerpt */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Excerpt *</label>
                <textarea
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
                  placeholder="Article excerpt"
                />
              </div>

              {/* Content */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Content *</label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[300px]"
                  placeholder="Article content"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="politics">Politics</option>
                  <option value="business">Business</option>
                  <option value="sports">Sports</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="technology">Technology</option>
                  <option value="world">World</option>
                </select>
              </div>

              {/* Author Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">Author Name</label>
                <input
                  type="text"
                  value={formData.authorName}
                  onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Author name"
                />
              </div>

              {/* Cover Image URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Cover Image URL</label>
                <input
                  type="url"
                  value={formData.coverImageUrl}
                  onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Published */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 rounded border-border cursor-pointer"
                />
                <label htmlFor="published" className="text-sm font-semibold cursor-pointer">
                  Publish immediately
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {editingId ? "Update Article" : "Create Article"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Articles List */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Articles</h2>

          {articles && articles.length > 0 ? (
            <div className="space-y-4">
              {articles.map((article: any) => (
                <div
                  key={article.id}
                  className="bg-background border border-border rounded-lg p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-foreground truncate">
                        {article.title}
                      </h3>
                      {article.published ? (
                        <Eye size={16} className="text-green-500 flex-shrink-0" />
                      ) : (
                        <EyeOff size={16} className="text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{article.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="badge-category bg-primary text-primary-foreground capitalize">
                        {article.category}
                      </span>
                      <span>{article.authorName}</span>
                      <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(article)}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(article.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-background border border-border rounded-lg">
              <p className="text-muted-foreground mb-4">No articles yet</p>
              <Button onClick={() => setFormData({ ...formData, title: "" })}>
                <Plus size={16} className="mr-2" />
                Create First Article
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
