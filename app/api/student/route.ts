import { NextRequest, NextResponse } from 'next/server';
import { 
  getStudents, 
  getStudentsWithUser,
  createStudent, 
  type NewStudent 
} from '@/src/schemas/student';

// GET - Obtener todos los estudiantes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeUser = searchParams.get('includeUser') === 'true';

    const students = includeUser ? await getStudentsWithUser() : await getStudents();
    
    if (!students) {
      return NextResponse.json(
        { message: 'No se encontraron estudiantes' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      students,
      message: 'Estudiantes obtenidos exitosamente',
      status: 200
    });

  } catch (error) {
    console.error('Error getting students:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al obtener estudiantes' },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo estudiante
export async function POST(request: NextRequest) {
  try {
    const data: NewStudent = await request.json();

    // Validar datos requeridos
    if (!data.name) {
      return NextResponse.json(
        { message: 'El nombre es requerido' },
        { status: 400 }
      );
    }

    const result = await createStudent(data);

    if (!result.rowCount) {
      return NextResponse.json(
        { message: 'No se pudo crear el estudiante' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Estudiante creado exitosamente',
      status: 201
    });

  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al crear estudiante' },
      { status: 500 }
    );
  }
}
