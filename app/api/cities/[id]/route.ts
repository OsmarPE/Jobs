import { NextRequest, NextResponse } from 'next/server';
import { 
  getCityById, 
  updateCity, 
  deleteCity,
  cityIdSchema,
  updateCitySchema 
} from '@/src/schemas/cities';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/cities/[id] - Obtener una ciudad por ID
export async function GET(
  request: NextRequest, 
  { params }: RouteParams
) {
  try {
    // Validar el ID
    const validation = cityIdSchema.safeParse({ id: params.id });
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'ID de ciudad inválido',
          details: validation.error.issues 
        },
        { status: 400 }
      );
    }

    // Buscar la ciudad
    const city = await getCityById(validation.data.id);
    
    if (!city) {
      return NextResponse.json(
        { 
          error: 'Ciudad no encontrada',
          message: `No se encontró una ciudad con el ID ${validation.data.id}`
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: city,
      message: 'Ciudad obtenida exitosamente'
    });

  } catch (error) {
    console.error('Error en GET /api/cities/[id]:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        message: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// PUT /api/cities/[id] - Actualizar una ciudad
export async function PUT(
  request: NextRequest, 
  { params }: RouteParams
) {
  try {
    // Validar el ID
    const idValidation = cityIdSchema.safeParse({ id: params.id });
    
    if (!idValidation.success) {
      return NextResponse.json(
        { 
          error: 'ID de ciudad inválido',
          details: idValidation.error.issues 
        },
        { status: 400 }
      );
    }

    // Obtener y validar el cuerpo de la petición
    const body = await request.json();
    const bodyValidation = updateCitySchema.safeParse(body);
    
    if (!bodyValidation.success) {
      return NextResponse.json(
        { 
          error: 'Datos de entrada inválidos',
          details: bodyValidation.error.issues 
        },
        { status: 400 }
      );
    }

    // Verificar que la ciudad existe
    const existingCity = await getCityById(idValidation.data.id);
    if (!existingCity) {
      return NextResponse.json(
        { 
          error: 'Ciudad no encontrada',
          message: `No se encontró una ciudad con el ID ${idValidation.data.id}`
        },
        { status: 404 }
      );
    }

    // Actualizar la ciudad
    const updatedCity = await updateCity(idValidation.data.id, bodyValidation.data);
    
    return NextResponse.json({
      success: true,
      data: updatedCity,
      message: 'Ciudad actualizada exitosamente'
    });

  } catch (error) {
    console.error('Error en PUT /api/cities/[id]:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        message: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/cities/[id] - Eliminar una ciudad
export async function DELETE(
  request: NextRequest, 
  { params }: RouteParams
) {
  try {
    // Validar el ID
    const validation = cityIdSchema.safeParse({ id: params.id });
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'ID de ciudad inválido',
          details: validation.error.issues 
        },
        { status: 400 }
      );
    }

    // Verificar que la ciudad existe
    const existingCity = await getCityById(validation.data.id);
    if (!existingCity) {
      return NextResponse.json(
        { 
          error: 'Ciudad no encontrada',
          message: `No se encontró una ciudad con el ID ${validation.data.id}`
        },
        { status: 404 }
      );
    }

    // Eliminar la ciudad
    const deletedCity = await deleteCity(validation.data.id);
    
    return NextResponse.json({
      success: true,
      data: deletedCity,
      message: 'Ciudad eliminada exitosamente'
    });

  } catch (error) {
    console.error('Error en DELETE /api/cities/[id]:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        message: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
