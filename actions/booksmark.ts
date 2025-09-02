'use server'
import { getUserByToken } from "@/lib/auth";
import { db } from "@/src";
import { bookmark } from "@/src/db/schema";
import { createBookmark } from "@/src/schemas/bookmark";
import { and, eq } from "drizzle-orm";

interface Props{
    userId: number;
    jobId: number;
}

export async function createBookmarkAction(data: Props) {

    const info = {
        userId: data.userId,
        jobId: data.jobId,
    }; 

    try {
        const result = await createBookmark(info.userId, info.jobId);

        if (!result.rowCount) {
            return {
                success: false,
                message: 'No se pudo crear el bookmark'
            };
        }

        return {
            success: true,
            message: 'Bookmark creado exitosamente'
        };
        
    }
    
    catch (error) {
        return {
            success: false,
            message: 'Error interno del servidor al crear bookmark'
        };
    }

}
export async function removeBookmarkAction(data: { id: number }) {

    const user = await getUserByToken();   
    

    if (!user) {
        return {
            success: false,
            message: 'Usuario no autorizado'
        };
    }

    if (!data.id) {
        return {
            success: false,
            message: 'ID de bookmark no proporcionado'
        };
    }

    try {

        const result = await db.delete(bookmark)
        .where(and(
            eq(bookmark.jobId, Number(data.id)),
            eq(bookmark.userId, user?.id)
        ));
    

        if (!result.rowCount) {
            return {
                success: false,
                message: 'No se pudo eliminar el bookmark'
            };
        }

        return {
            success: true,
            message: 'Bookmark eliminado exitosamente'
        };
        
    }
    
    catch (error) {
        return {
            success: false,
            message: 'Error interno del servidor al eliminar bookmark'
        };
    }

}