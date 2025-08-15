import { NextRequest, NextResponse } from 'next/server';
import { 
  getStudentById, 
  updateStudent, 
  deleteStudent,
  type UpdateStudent 
} from '@/src/schemas/student';

// GET - Obtener un estudiante por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const studentId = parseInt(params.id);

    if (isNaN(studentId)) {
      return NextResponse.json(
        { message: 'ID de estudiante inválido' },
        { status: 400 }
      );
    }

    const student = await getStudentById(studentId);

    if (!student || student.length === 0) {
      return NextResponse.json(
        { message: 'Estudiante no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      student: student[0],
      message: 'Estudiante obtenido exitosamente',
      status: 200
    });

  } catch (error) {
    console.error('Error getting student by ID:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al obtener estudiante' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar un estudiante por ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const studentId = parseInt(params.id);

    if (isNaN(studentId)) {
      return NextResponse.json(
        { message: 'ID de estudiante inválido' },
        { status: 400 }
      );
    }

    const data: UpdateStudent = await request.json();

    // Verificar que el estudiante existe
    const existingStudent = await getStudentById(studentId);
    if (!existingStudent || existingStudent.length === 0) {
      return NextResponse.json(
        { message: 'Estudiante no encontrado' },
        { status: 404 }
      );
    }

    const result = await updateStudent(studentId, data);

    if (!result.rowCount) {
      return NextResponse.json(
        { message: 'No se pudo actualizar el estudiante' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Estudiante actualizado exitosamente',
      status: 200
    });

  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al actualizar estudiante' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar un estudiante por ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const studentId = parseInt(params.id);

    if (isNaN(studentId)) {
      return NextResponse.json(
        { message: 'ID de estudiante inválido' },
        { status: 400 }
      );
    }

    // Verificar que el estudiante existe
    const existingStudent = await getStudentById(studentId);
    if (!existingStudent || existingStudent.length === 0) {
      return NextResponse.json(
        { message: 'Estudiante no encontrado' },
        { status: 404 }
      );
    }

    const result = await deleteStudent(studentId);

    if (!result.rowCount) {
      return NextResponse.json(
        { message: 'No se pudo eliminar el estudiante' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Estudiante eliminado exitosamente',
      status: 200
    });

  } catch (error) {
    console.error('Error deleting student:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al eliminar estudiante' },
      { status: 500 }
    );
  }
}
