import { NextRequest, NextResponse } from 'next/server';
import { getExperiencesByUserId } from '@/src/schemas/experience';

// GET - Obtener experiencias por user ID
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = parseInt(params.userId);

    if (isNaN(userId)) {
      return NextResponse.json(
        { message: 'ID de usuario inválido' },
        { status: 400 }
      );
    }

    const data = await getExperiencesByUserId(userId);

    if (!data || data.length === 0) {
      return NextResponse.json(
        { message: 'No se encontraron experiencias para este usuario' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data,
      message: 'Experiencias obtenidas exitosamente',
      status: 200
    });

  } catch (error) {
    console.error('Error getting experiences by user ID:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al obtener experiencias' },
      { status: 500 }
    );
  }
}
