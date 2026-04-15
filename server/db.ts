import { eq, desc, like, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, articles, Article, InsertArticle } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Article queries

export async function getPublishedArticles(limit: number = 20, offset: number = 0) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(articles)
    .where(eq(articles.published, true))
    .orderBy(desc(articles.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function getArticleBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db
    .select()
    .from(articles)
    .where(and(eq(articles.slug, slug), eq(articles.published, true)))
    .limit(1);
  
  return result.length > 0 ? result[0] : undefined;
}

export async function getArticlesByCategory(category: string, limit: number = 20, offset: number = 0) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(articles)
    .where(and(eq(articles.category, category as any), eq(articles.published, true)))
    .orderBy(desc(articles.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function searchArticles(query: string, limit: number = 20, offset: number = 0) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(articles)
    .where(and(
      eq(articles.published, true),
      like(articles.title, `%${query}%`)
    ))
    .orderBy(desc(articles.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function getRelatedArticles(category: string, currentSlug: string, limit: number = 3) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(articles)
    .where(and(
      eq(articles.category, category as any),
      eq(articles.published, true)
    ))
    .orderBy(desc(articles.createdAt))
    .limit(limit + 1)
    .then(results => results.filter(a => a.slug !== currentSlug).slice(0, limit));
}

export async function createArticle(article: InsertArticle) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(articles).values(article);
  return result;
}

export async function updateArticle(id: number, updates: Partial<InsertArticle>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(articles).set(updates).where(eq(articles.id, id));
}

export async function deleteArticle(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.delete(articles).where(eq(articles.id, id));
}

export async function getArticleById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllArticles(limit: number = 100, offset: number = 0) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(articles)
    .orderBy(desc(articles.createdAt))
    .limit(limit)
    .offset(offset);
}
