'use server'

import { createExperience, updateExperience, deleteExperience, getExperienceById } from "@/src/schemas/experience";
import { revalidatePath } from "next/cache";

interface ExperienceActionData {
  userId: number;
  dateFrom: string | Date;
  dateTo: string | Date;
  currentJob: boolean;
  area: string;
  areaJob: string;
}

interface UpdateExperienceActionData {
  dateFrom?: string | Date;
  dateTo?: string | Date;
  currentJob?: boolean;
  area?: string;
  areaJob?: string;
}

export async function createExperienceAction(data: ExperienceActionData) {
  try {
    const processedData = {
      userId: data.userId,
      dateFrom: data.dateFrom instanceof Date ? data.dateFrom.toISOString().split('T')[0] : data.dateFrom,
      dateTo: data.currentJob ? null : (data.dateTo instanceof Date ? data.dateTo.toISOString().split('T')[0] : data.dateTo),
      currentJob: data.currentJob,
      area: data.area,
      areaJob: data.areaJob,
    };

    if (!processedData.dateFrom) {
      return {
        success: false,
        message: 'La fecha de inicio es requerida'
      };
    }

    if (!processedData.currentJob && !processedData.dateTo) {
      return {
        success: false,
        message: 'La fecha de fin es requerida si no es trabajo actual'
      };
    }

    const result = await createExperience(processedData);

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

  } catch (error) {
    console.error('Error creating experience:', error);
    return {
      success: false,
      message: 'Error interno del servidor al crear experiencia'
    };
  }
}

export async function updateExperienceAction(id: number, data: UpdateExperienceActionData) {
  try {
    const existing = await getExperienceById(id);
    if (!existing || existing.length === 0) {
      return {
        success: false,
        message: 'Experiencia no encontrada'
      };
    }

    const processedData: any = { ...data };
    
    if (processedData.dateFrom) {
      processedData.dateFrom = processedData.dateFrom instanceof Date 
        ? processedData.dateFrom.toISOString().split('T')[0] 
        : processedData.dateFrom;
    }
    
    if (processedData.currentJob) {
      processedData.dateTo = null;
    } else if (processedData.dateTo) {
      processedData.dateTo = processedData.dateTo instanceof Date 
        ? processedData.dateTo.toISOString().split('T')[0] 
        : processedData.dateTo;
    }

    if (processedData.currentJob === false && !processedData.dateTo) {
      return {
        success: false,
        message: 'La fecha de fin es requerida si no es trabajo actual'
      };
    }

    const result = await updateExperience(id, processedData);

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
    console.error('Error updating experience:', error);
    return {
      success: false,
      message: 'Error interno del servidor al actualizar experiencia'
    };
  }
}

export async function deleteExperienceAction(id: number) {
  try {
    const existing = await getExperienceById(id);
    if (!existing || existing.length === 0) {
      return {
        success: false,
        message: 'Experiencia no encontrada'
      };
    }

    const result = await deleteExperience(id);

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
    console.error('Error deleting experience:', error);
    return {
      success: false,
      message: 'Error interno del servidor al eliminar experiencia'
    };
  }
}
