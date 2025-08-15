import { NextRequest, NextResponse } from 'next/server';
import { 
  getSkillss, 
  updateSkills, 
  deleteSkills,
  type UpdateSkills 
} from '@/src/schemas/skills';

// GET - Obtener una skill por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const skillId = parseInt(params.id);

    if (isNaN(skillId)) {
      return NextResponse.json(
        { message: 'ID de skill inválido' },
        { status: 400 }
      );
    }

    const skill = await getSkillss(skillId);

    if (!skill) {
      return NextResponse.json(
        { message: 'Skill no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      skill,
      message: 'Skill obtenida exitosamente',
      status: 200
    });

  } catch (error) {
    console.error('Error getting skill by ID:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al obtener skill' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar una skill por ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const skillId = parseInt(params.id)

    if (isNaN(skillId)) {
      return NextResponse.json(
        { message: 'ID de skill inválido' },
        { status: 400 }
      );
    }

    const data: UpdateSkills = await request.json();

    if (data.name !== undefined && (!data.name || data.name.trim() === '')) {
      return NextResponse.json(
        { message: 'El nombre de la skill no puede estar vacío' },
        { status: 400 }
      );
    }

    const existingSkill = await getSkillss(skillId);
    if (!existingSkill) {
      return NextResponse.json(
        { message: 'Skill no encontrada' },
        { status: 404 }
      );
    }

    const result = await updateSkills(skillId, data);

    if (!result.rowCount) {
      return NextResponse.json(
        { message: 'No se pudo actualizar la skill' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Skill actualizada exitosamente',
      status: 200
    });

  } catch (error) {
    console.error('Error updating skill:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al actualizar skill' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar una skill por ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const skillId = parseInt(params.id);

    if (isNaN(skillId)) {
      return NextResponse.json(
        { message: 'ID de skill inválido' },
        { status: 400 }
      );
    }

    // Verificar que la skill existe
    const existingSkill = await getSkillss(skillId);
    if (!existingSkill) {
      return NextResponse.json(
        { message: 'Skill no encontrada' },
        { status: 404 }
      );
    }

    const result = await deleteSkills(skillId);

    if (!result.rowCount) {
      return NextResponse.json(
        { message: 'No se pudo eliminar la skill' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Skill eliminada exitosamente',
      status: 200
    });

  } catch (error) {
    console.error('Error deleting skill:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al eliminar skill' },
      { status: 500 }
    );
  }
}
