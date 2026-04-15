import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import {
  getPublishedArticles,
  getArticleBySlug,
  getArticlesByCategory,
  searchArticles,
  getRelatedArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticleById,
  getAllArticles,
} from "./db";
import { TRPCError } from "@trpc/server";

// Helper to check if user is admin
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

// Helper to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  articles: router({
    // Public procedures
    list: publicProcedure
      .input(z.object({ limit: z.number().default(20), offset: z.number().default(0) }))
      .query(({ input }) => getPublishedArticles(input.limit, input.offset)),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(({ input }) => getArticleBySlug(input.slug)),

    getByCategory: publicProcedure
      .input(z.object({ category: z.string(), limit: z.number().default(20), offset: z.number().default(0) }))
      .query(({ input }) => getArticlesByCategory(input.category, input.limit, input.offset)),

    search: publicProcedure
      .input(z.object({ query: z.string(), limit: z.number().default(20), offset: z.number().default(0) }))
      .query(({ input }) => searchArticles(input.query, input.limit, input.offset)),

    getRelated: publicProcedure
      .input(z.object({ category: z.string(), currentSlug: z.string(), limit: z.number().default(3) }))
      .query(({ input }) => getRelatedArticles(input.category, input.currentSlug, input.limit)),

    // Admin procedures
    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        excerpt: z.string().min(1),
        category: z.enum(["politics", "business", "sports", "entertainment", "technology", "world"]),
        coverImageUrl: z.string().optional(),
        authorName: z.string().optional(),
        published: z.boolean().default(false),
      }))
      .mutation(async ({ input }) => {
        const slug = generateSlug(input.title);
        return await createArticle({
          title: input.title,
          slug,
          content: input.content,
          excerpt: input.excerpt,
          category: input.category,
          coverImageUrl: input.coverImageUrl,
          authorName: input.authorName || "Nigerian Insider News",
          published: input.published,
        });
      }),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        content: z.string().optional(),
        excerpt: z.string().optional(),
        category: z.enum(["politics", "business", "sports", "entertainment", "technology", "world"]).optional(),
        coverImageUrl: z.string().optional(),
        authorName: z.string().optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...updates } = input;
        const updateData: any = { ...updates };
        if (updates.title) {
          updateData.slug = generateSlug(updates.title);
        }
        return await updateArticle(id, updateData);
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await deleteArticle(input.id);
      }),

    getById: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getArticleById(input.id)),

    listAll: adminProcedure
      .input(z.object({ limit: z.number().default(100), offset: z.number().default(0) }))
      .query(({ input }) => getAllArticles(input.limit, input.offset)),
  }),
});

export type AppRouter = typeof appRouter;
