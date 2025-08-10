
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
            .where(eq(users.id, id))
            .limit(1);

        return data.length ? data[0] : null;

    } catch (error) {
        throw new Error(`Error fetching user: ${error}`);
    }
}
export const Register = async ({email,name,password}:NewUser) => {
    
    const code = getCode();
    const token = generateToken();
    
    try {
        const data = await db
            .insert(users)
            .values({
                name,
                email,
                password,
                code,
                token

            });

        return {...data,  code, token};
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
export const updateUser = async (id: number, {...datas}:UpdateUser) => {

    console.log({
        ...datas,
        id  
    });
    
    try {
        const data = await db
            .update(users)
            .set(datas)
            .where(eq(users.id, id));

            console.log(data);
            
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

export const getUserByToken = async (token: string) => {
    try {
        const data = await db
            .select()
            .from(users)
            .where(eq(users.token, token))
            .limit(1);

        return data ? data[0] : null;

    } catch (error) {
        throw new Error(`Error fetching user by token: ${error}`);
    }
}

export const activateUser = async (id: User['id']) => {
    try {
        const data = await db
            .update(users)
            .set({
                active: true,
                token: null,
                code: null
            })
            .where(eq(users.id, id));

        return data
    } catch (error) {
        throw new Error(`Error activating user: ${error}`);
    }
}


export const getProfile = async (id: User['id']) => {
    try {
        const data = await db.query.users.findFirst({
            where: eq(users.id, id),
            with:{
                experiences: true,
                skills: true,
                educations: true,
                languages: {
                    with: {
                        language: true
                    }
                },
            }
        })

        return data ? data : null;

    } catch (error) {
        throw new Error(`Error fetching profile: ${error}`);
    }
}