'use server'
import { createEducation, deleteEducation, updateEducation } from "@/src/schemas/education";
import { revalidatePath } from "next/cache";;
interface EducationActionData {
    userId: number;
    institution: string;
    title: string;
    dateFrom: string | Date;
    dateTo?: string | Date;
    finished: boolean;
}

export async function createEducationAction(data: EducationActionData) {

    const info = {
        userId: data.userId,
        institution: data.institution,
        title: data.title,
        dateFrom: data.dateFrom instanceof Date ? data.dateFrom.toISOString().split('T')[0] : data.dateFrom,
        dateTo: data.dateTo ? data.dateTo instanceof Date ? data.dateTo.toISOString().split('T')[0] : data.dateTo : null,
        finished: data.finished,
    };

    try {
        const result = await createEducation(info);

        if (!result.rowCount) {
            return {
                success: false,
                message: 'No se pudo crear la experiencia'
            };
        }

        revalidatePath('/profile');
        
        return {
            success: true,
            message: 'Experiencia creada exitosamente'
        };

    }
    
    catch (error) {
        console.error('Error creating education:', error);
        return {
            success: false,
            message: 'Error interno del servidor al crear experiencia'
        };
    }

}

export async function updateEducationAction(id: number, data: Partial<EducationActionData>) {
    try {
        const processedData = {
            institution: data.institution,
            title: data.title,
            dateFrom: data.dateFrom instanceof Date ? data.dateFrom.toISOString().split('T')[0] : data.dateFrom,
            dateTo: data.dateTo instanceof Date ? data.dateTo.toISOString().split('T')[0] : data.dateTo,
            finished: data.finished,
        };

        const result = await updateEducation(id, processedData);

        if (!result.rowCount) {
            return {
                success: false,
                message: 'No se pudo actualizar la experiencia'
            };
        }

        revalidatePath('/profile');
        
        return {
            success: true,
            message: 'Experiencia actualizada exitosamente'
        };

    } catch (error) {
        console.error('Error updating education:', error);
        return {
            success: false,
            message: 'Error interno del servidor al actualizar experiencia'
        };
    }
    
    
}

export async function deleteEducationAction(id:number) {
    try {
        const result = await deleteEducation(id);

        if (!result.rowCount) {
            return {
                success: false,
                message: 'No se pudo eliminar la experiencia'
            };
        }

        revalidatePath('/profile');
        
        return {
            success: true,
            message: 'Experiencia eliminada exitosamente'
        };

    } catch (error) {
        console.error('Error deleting education:', error);
        return {
            success: false,
            message: 'Error interno del servidor al eliminar experiencia'
        };
    }
    
}       