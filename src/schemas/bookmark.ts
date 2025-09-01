import { eq } from "drizzle-orm";
import { db } from "..";
import { bookmark } from "../db/schema";

export type NewBookmark = typeof bookmark.$inferInsert;
export type Bookmark = typeof bookmark.$inferSelect;

export const getUserBookmarks = async (userId: number) => {
  const bookmarks = await db.query.bookmark.findMany({
    where: eq(bookmark.userId, userId)
  });
  return bookmarks;
};

export const createBookmark = async (userId: number, jobId: number) => {
  const data = await db.insert(bookmark).values({
    userId,
    jobId
  });
  return data;
};