import { getLanguages } from "@/src/schemas/languages";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const languages = await getLanguages();
    
    return NextResponse.json({
      success: true,
      data: languages
    });
  } catch (error) {
    console.error('Error fetching languages:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error al obtener los idiomas' 
      },
      { status: 500 }
    );
  }
}
