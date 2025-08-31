import { NextRequest, NextResponse } from 'next/server';
import { 
  getExperienceById, 
  updateExperience, 
  deleteExperience,
  type UpdateExperience 
} from '@/src/schemas/experience';

// GET - Obtener una experiencia por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const experienceId = parseInt(params.id);

    if (isNaN(experienceId)) {
      return NextResponse.json(
        { message: 'ID de experiencia inválido' },
        { status: 400 }
      );
    }

    const experience = await getExperienceById(experienceId);

    if (!experience || experience.length === 0) {
      return NextResponse.json(
        { message: 'Experiencia no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      experience: experience[0],
      message: 'Experiencia obtenida exitosamente',
      status: 200
    });

  } catch (error) {
    console.error('Error getting experience by ID:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al obtener experiencia' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar una experiencia por ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const experienceId = parseInt(params.id);

    if (isNaN(experienceId)) {
      return NextResponse.json(
        { message: 'ID de experiencia inválido',
          success: false,
          data: null
         },
        { status: 400 }
      );
    }

    const data: UpdateExperience = await request.json();

    // Validaciones específicas
    if (data.dateFrom && !data.dateFrom) {
      return NextResponse.json(
        { message: 'La fecha de inicio no puede estar vacía',
          success: false,
          data: null
        },
        { status: 400 }
      );
    }

    // Validar que si currentJob es false, debe tener dateTo
    if (data.currentJob === false && !data.dateTo) {
      return NextResponse.json(
        { message: 'La fecha de fin es requerida si no es trabajo actual',
          success: false,
          data: null
        },
        { status: 400 }
      );
    }

    // Si es trabajo actual, no debe tener fecha de fin
    if (data.currentJob === true && data.dateTo) {
      // Limpiar dateTo si se marca como trabajo actual
      data.dateTo = null;
    }

    // Verificar que la experiencia existe
    const existingExperience = await getExperienceById(experienceId);
    if (!existingExperience || existingExperience.length === 0) {
      return NextResponse.json(
        { message: 'Experiencia no encontrada', success: false, data: null },
        { status: 404 }
      );
    }

    const result = await updateExperience(experienceId, data);

    if (!result.rowCount) {
      return NextResponse.json(
        { message: 'No se pudo actualizar la experiencia', success: false, data: null },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Experiencia actualizada exitosamente',
      success: true,
      data: null
    });

  } catch (error) {
    console.error('Error updating experience:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al actualizar experiencia', success: false, data: null },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar una experiencia por ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {

    const { id } = await params;

    const experienceId = parseInt(id);

    // Verificar que la experiencia existe
    const existingExperience = await getExperienceById(experienceId);
    
    if (!existingExperience || existingExperience.length === 0) {
      return NextResponse.json(
        { message: 'Experiencia no encontrada' , success: false},
        { status: 404 }
      );
    }

    const result = await deleteExperience(experienceId);

    if (!result.rowCount) {
      return NextResponse.json(
        { message: 'No se pudo eliminar la experiencia', success: false },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Experiencia eliminada exitosamente',
      success: true
    });

  } catch (error) {
    console.error('Error deleting experience:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al eliminar experiencia', success: false },
      { status: 500 }
    );
  }
}
