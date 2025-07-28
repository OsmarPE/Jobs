
import { eq } from 'drizzle-orm';
import { category } from '../db/schema';
import { db } from '..';


export type Category = typeof category.$inferSelect;
export type NewCategory = typeof category.$inferInsert;
export type UpdateCategory = Partial<NewCategory>;

export const  getCategories = async (): Promise<Category[]> => {
    try {
      const data = await db
        .query
        .category
        .findMany();
      
      return data;
    } catch (error) {
      throw new Error(`Error fetching categories: ${error}`);
    }

}

export const getCategory = async (id: Category['id']): Promise<Category | undefined> => {
  try {
    const data = await db
      .query
      .category
      .findFirst({
        where: eq(category.id, id)
      })
    
    return data;
  } catch (error) {
    throw new Error(`Error fetching category: ${error}`);
  }
}

export const createCategory = async ({ name }: NewCategory) => {
  try {
    const data = await db
      .insert(category)
      .values({
        name
      })
     
    return data;
  } catch (error) {
    throw new Error(`Error creating category: ${error}`);
  }
}

export const updateCategory = async (id: Category['id'], { name }: UpdateCategory) => {
  try {
    const data = await db
      .update(category)
      .set({
        name
      })
      .where(eq(category.id, id))
     
    return data;
  } catch (error) {
    throw new Error(`Error updating category: ${error}`);
  }
}

export const deleteCategory = async (id: Category['id']) => {
  try {
    const data = await db
      .delete(category)
      .where(eq(category.id, id))

    return data;
  } catch (error) {
    throw new Error(`Error deleting category: ${error}`);
  }
}