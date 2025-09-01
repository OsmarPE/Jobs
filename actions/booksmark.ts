import { createBookmark } from "@/src/schemas/bookmark";

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