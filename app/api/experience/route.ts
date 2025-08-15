import { NextRequest, NextResponse } from 'next/server';
import { 
  getExperiences, 
  getExperiencesWithUser,
  createExperience, 
  type NewExperience 
} from '@/src/schemas/experience';

// GET - Obtener todas las experiencias
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeUser = searchParams.get('includeUser') === 'true';

    const experiences = includeUser ? await getExperiencesWithUser() : await getExperiences();
    
    if (!experiences) {
      return NextResponse.json(
        { message: 'No se encontraron experiencias' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      experiences,
      message: 'Experiencias obtenidas exitosamente',
      status: 200
    });

  } catch (error) {
    console.error('Error getting experiences:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al obtener experiencias' },
      { status: 500 }
    );
  }
}

// POST - Crear una nueva experiencia
export async function POST(request: NextRequest) {
  try {
    const data: NewExperience = await request.json();

    // Validar datos requeridos
    if (!data.dateFrom) {
      return NextResponse.json(
        { message: 'La fecha de inicio es requerida' },
        { status: 400 }
      );
    }

    // Validar que si currentJob es false, debe tener dateTo
    if (!data.currentJob && !data.dateTo) {
      return NextResponse.json(
        { message: 'La fecha de fin es requerida si no es trabajo actual' },
        { status: 400 }
      );
    }

    // Si es trabajo actual, no debe tener fecha de fin
    if (data.currentJob && data.dateTo) {
      return NextResponse.json(
        { message: 'No se puede especificar fecha de fin para trabajo actual' },
        { status: 400 }
      );
    }

    const result = await createExperience(data);

    if (!result.rowCount) {
      return NextResponse.json(
        { message: 'No se pudo crear la experiencia' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Experiencia creada exitosamente',
      status: 201
    });

  } catch (error) {
    console.error('Error creating experience:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al crear experiencia' },
      { status: 500 }
    );
  }
}
