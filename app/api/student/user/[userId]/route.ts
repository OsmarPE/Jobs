import { NextRequest, NextResponse } from 'next/server';
import { getStudentByUserId } from '@/src/schemas/student';

// GET - Obtener estudiante por user ID
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

    const student = await getStudentByUserId(userId);

    if (!student || student.length === 0) {
      return NextResponse.json(
        { message: 'Estudiante no encontrado para este usuario' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      student: student[0],
      message: 'Estudiante obtenido exitosamente',
      status: 200
    });

  } catch (error) {
    console.error('Error getting student by user ID:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al obtener estudiante' },
      { status: 500 }
    );
  }
}
