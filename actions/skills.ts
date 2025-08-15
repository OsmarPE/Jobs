

'use server'
import { createSkills, deleteSkills, getSkills, NewSkills, updateSkills } from "@/src/schemas/skills";
import { revalidatePath } from "next/cache";

interface SkillsActionData {
    userId: number;
    name: string;
}

export async function createSkillsAction(data: SkillsActionData) {

    const info = {
        userId: data.userId,
        name: data.name,
    };

    try {
        const result = await createSkills(info);

        if (!result.rowCount) {
            return {
                success: false,
                message: 'No se pudo crear la habilidad'
            };
        }

        revalidatePath('/profile');
        
        return {
            success: true,
            message: 'Habilidad creada exitosamente'
        };

    } catch (error) {
        console.error('Error creating skill:', error);
        return {
            success: false,
            message: 'Error interno del servidor al crear habilidad'
        };
    }

}

export async function updateSkillsAction(id: number, data: Partial<SkillsActionData>) {
    try {
        const processedData = {
            name: data.name,
        };

        const result = await updateSkills(id, processedData);

        if (!result.rowCount) {
            return {
                success: false,
                message: 'No se pudo actualizar la habilidad'
            };
        }

        revalidatePath('/profile');
        
        return {
            success: true,
            message: 'Habilidad actualizada exitosamente'
        };

    } catch (error) {
        console.error('Error updating skill:', error);
        return {
            success: false,
            message: 'Error interno del servidor al actualizar habilidad'
        };
    }
    
    
}

export async function deleteSkillsAction(id:number) {
    try {
        const result = await deleteSkills(id);

        if (!result.rowCount) {
            return {
                success: false,
                message: 'No se pudo eliminar la habilidad'
            };
        }

        revalidatePath('/profile');
        
        return {
            success: true,
            message: 'Habilidad eliminada exitosamente'
        };

    } catch (error) {
        console.error('Error deleting skill:', error);
        return {
            success: false,
            message: 'Error interno del servidor al eliminar habilidad'
        };
    }
    
}   


export async function createSkillbyUserAction(data: SkillsActionData) {

    const info = {
        userId: data.userId,
        name: data.name,
    };

    try {
        const result = await createSkills(info);
        
        if (!result.rowCount) {
            return {
                success: false,
                message: 'No se pudo crear la habilidad'
            };
        }

        revalidatePath('/profile');
        
        return {
            success: true,
            message: 'Habilidad creada exitosamente'
        };

    } catch (error) {
        console.error('Error creating skill:', error);
        return {
            success: false,
            message: 'Error interno del servidor al crear habilidad'
        };
    }

}