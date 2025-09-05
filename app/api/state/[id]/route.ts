import { NextRequest, NextResponse } from 'next/server';
import { 
  getStateById, 
  updateState, 
  deleteState,
  stateIdSchema,
  updateStateSchema 
} from '@/src/schemas/states';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/state/[id] - Obtener un estado por ID
export async function GET(
  request: NextRequest, 
  { params }: RouteParams
) {
  try {
    // Validar el ID
    const validation = stateIdSchema.safeParse({ id: params.id });
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'ID de estado inválido',
          details: validation.error.issues 
        },
        { status: 400 }
      );
    }

    // Buscar el estado
    const state = await getStateById(validation.data.id);
    
    if (!state) {
      return NextResponse.json(
        { 
          error: 'Estado no encontrado',
          message: `No se encontró un estado con el ID ${validation.data.id}`
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: state,
      message: 'Estado obtenido exitosamente'
    });

  } catch (error) {
    console.error('Error en GET /api/state/[id]:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        message: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// PUT /api/state/[id] - Actualizar un estado
export async function PUT(
  request: NextRequest, 
  { params }: RouteParams
) {
  try {
    // Validar el ID
    const idValidation = stateIdSchema.safeParse({ id: params.id });
    
    if (!idValidation.success) {
      return NextResponse.json(
        { 
          error: 'ID de estado inválido',
          details: idValidation.error.issues 
        },
        { status: 400 }
      );
    }

    // Obtener y validar el cuerpo de la petición
    const body = await request.json();
    const bodyValidation = updateStateSchema.safeParse(body);
    
    if (!bodyValidation.success) {
      return NextResponse.json(
        { 
          error: 'Datos de entrada inválidos',
          details: bodyValidation.error.issues 
        },
        { status: 400 }
      );
    }

    // Verificar que el estado existe
    const existingState = await getStateById(idValidation.data.id);
    if (!existingState) {
      return NextResponse.json(
        { 
          error: 'Estado no encontrado',
          message: `No se encontró un estado con el ID ${idValidation.data.id}`
        },
        { status: 404 }
      );
    }

    // Actualizar el estado
    const updatedState = await updateState(idValidation.data.id, bodyValidation.data);
    
    return NextResponse.json({
      success: true,
      data: updatedState,
      message: 'Estado actualizado exitosamente'
    });

  } catch (error) {
    console.error('Error en PUT /api/state/[id]:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        message: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/state/[id] - Eliminar un estado
export async function DELETE(
  request: NextRequest, 
  { params }: RouteParams
) {
  try {
    // Validar el ID
    const validation = stateIdSchema.safeParse({ id: params.id });
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'ID de estado inválido',
          details: validation.error.issues 
        },
        { status: 400 }
      );
    }

    // Verificar que el estado existe
    const existingState = await getStateById(validation.data.id);
    if (!existingState) {
      return NextResponse.json(
        { 
          error: 'Estado no encontrado',
          message: `No se encontró un estado con el ID ${validation.data.id}`
        },
        { status: 404 }
      );
    }

    // Eliminar el estado
    const deletedState = await deleteState(validation.data.id);
    
    return NextResponse.json({
      success: true,
      data: deletedState,
      message: 'Estado eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error en DELETE /api/state/[id]:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        message: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
