import { getUserLanguages, addLanguageToUser, removeLanguageFromUser } from "@/src/schemas/languages";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);
    
    if (isNaN(userId)) {
      return NextResponse.json(
        { success: false, error: 'ID de usuario inválido' },
        { status: 400 }
      );
    }
    
    const userLanguages = await getUserLanguages(userId);
    
    return NextResponse.json({
      success: true,
      data: userLanguages
    });
  } catch (error) {
    console.error('Error fetching user languages:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error al obtener los idiomas del usuario' 
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);
    const { languageId } = await request.json();
    
    if (isNaN(userId) || !languageId) {
      return NextResponse.json(
        { success: false, error: 'Datos inválidos' },
        { status: 400 }
      );
    }
    
    const result = await addLanguageToUser(userId, parseInt(languageId));
    
    return NextResponse.json({
      success: true,
      data: result,
      message: 'Idioma agregado correctamente'
    });
  } catch (error) {
    console.error('Error adding language to user:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error al agregar el idioma' 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);
    const { searchParams } = new URL(request.url);
    const languageId = searchParams.get('languageId');
    
    if (isNaN(userId) || !languageId) {
      return NextResponse.json(
        { success: false, error: 'Datos inválidos' },
        { status: 400 }
      );
    }
    
    const result = await removeLanguageFromUser(userId, parseInt(languageId));
    
    return NextResponse.json({
      success: true,
      data: result,
      message: 'Idioma eliminado correctamente'
    });
  } catch (error) {
    console.error('Error removing language from user:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error al eliminar el idioma' 
      },
      { status: 500 }
    );
  }
}
