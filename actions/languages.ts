"use server";

import { getLanguages, getUserLanguages, addLanguageToUser, removeLanguageFromUser } from "@/src/schemas/languages";
import { revalidatePath } from "next/cache";

export async function getAllLanguagesAction() {
  try {
    const languages = await getLanguages();
    
    return {
      success: true,
      data: languages,
      message: "Idiomas obtenidos correctamente"
    };
  } catch (error) {
    console.error('Error fetching languages:', error);
    return {
      success: false,
      data: null,
      message: "Error al obtener los idiomas"
    };
  }
}

export async function getUserLanguagesAction(userId: number) {
  try {
    const userLanguages = await getUserLanguages(userId);
    
    return {
      success: true,
      data: userLanguages,
      message: "Idiomas del usuario obtenidos correctamente"
    };
  } catch (error) {
    console.error('Error fetching user languages:', error);
    return {
      success: false,
      data: null,
      message: "Error al obtener los idiomas del usuario"
    };
  }
}

export async function addLanguageToUserAction(userId: number, languageId: number) {
  try {
    const result = await addLanguageToUser(userId, languageId);
    
    // Revalidar la página para actualizar los datos
    revalidatePath('/profile');
    
    return {
      success: true,
      data: result,
      message: "Idioma agregado correctamente"
    };
  } catch (error) {
    console.error('Error adding language to user:', error);
    return {
      success: false,
      data: null,
      message: "Error al agregar el idioma"
    };
  }
}

export async function removeLanguageFromUserAction(userId: number, languageId: number) {
  try {
    const result = await removeLanguageFromUser(userId, languageId);
    
    // Revalidar la página para actualizar los datos
    revalidatePath('/profile');
    
    return {
      success: true,
      data: result,
      message: "Idioma eliminado correctamente"
    };
  } catch (error) {
    console.error('Error removing language from user:', error);
    return {
      success: false,
      data: null,
      message: "Error al eliminar el idioma"
    };
  }
}
