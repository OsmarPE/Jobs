import 'server-only'
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, SALT_ROUNDS);
    
}
export async function verifyPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
}

export const getUserByToken = async <T = any>(): Promise<T | null> => {
    const cookie = await cookies();
    const token = cookie.get('token');
    if (!token) return null
    const user = jwt.verify(token.value, process.env.SECRET_KEY!) as T;
    return user;
}

