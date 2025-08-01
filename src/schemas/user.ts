
import { eq } from 'drizzle-orm';
import { users } from '../db/schema';
import { db } from '..';
import { generateToken, getCode } from '@/lib/utils';


export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UpdateUser = Partial<NewUser>;


export const getUsers = async () => {
    try {

        const data = await db
            .select()
            .from(users);

        return data;
    } catch (error) {
        throw new Error(`Error fetching users: ${error}`);
    }
}

export const getUserById = async (id: User['id']) => {
    try {
        
        const data = await db
            .select()
            .from(users)
            .where(eq(users.id, id));

        return data;

    } catch (error) {
        throw new Error(`Error fetching user: ${error}`);
    }
}
export const Register = async ({email,name,password}:NewUser) => {
    
    const code = getCode();
    
    try {
        const data = await db
            .insert(users)
            .values({
                name,
                email,
                password,
                code

            });

        return data;
    } catch (error) {
         throw new Error(`Error registering user: ${error}`);
    }
}

export const deleteUser = async (id: User['id']) => {
    try {
        const data = await db
            .delete(users)
            .where(eq(users.id, id));

        return data
    } catch (error) {
        throw new Error(`Error deleting user: ${error}`);
    }
}
export const updateUser = async (id: number, {name,email,password}:UpdateUser) => {

    
    try {
        const data = await db
            .update(users)
            .set({
                name,
                email,
                password
            })
            .where(eq(users.id, id));

        return data
    } catch (error) {
        throw new Error(`Error updating user: ${error}`);
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const data = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        return data ? data[0] : null;

    } catch (error) {
        throw new Error(`Error fetching user by email: ${error}`);
    }
}   