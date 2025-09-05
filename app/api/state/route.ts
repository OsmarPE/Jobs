import { NextRequest, NextResponse } from 'next/server';
import { 
  getStates, 
  createState, 
  createStateSchema,
  statesByCountrySchema,
  getStatesByCountryId 
} from '@/src/schemas/states';

// GET /api/state - Obtener todos los estados o por país
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const countryId = searchParams.get('countryId');

    // Si se proporciona countryId, obtener estados por país
    if (countryId) {
      const validation = statesByCountrySchema.safeParse({ countryId });
      
      if (!validation.success) {
        return NextResponse.json(
          { 
            error: 'Parámetros inválidos',
            details: validation.error.issues 
          },
          { status: 400 }
        );
      }

      const states = await getStatesByCountryId(validation.data.countryId);
      return NextResponse.json({
        success: true,
        data: states,
        message: `Estados obtenidos para el país ${countryId}`
      });
    }

    // Obtener todos los estados
    const states = await getStates();
    return NextResponse.json({
      success: true,
      data: states,
      message: 'Estados obtenidos exitosamente'
    });

  } catch (error) {
    console.error('Error en GET /api/state:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        message: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// POST /api/state - Crear un nuevo estado
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar los datos de entrada
    const validation = createStateSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Datos de entrada inválidos',
          details: validation.error.issues 
        },
        { status: 400 }
      );
    }

    // Crear el estado
    const newState = await createState(validation.data);
    
    return NextResponse.json({
      success: true,
      data: newState,
      message: 'Estado creado exitosamente'
    }, { status: 201 });

  } catch (error) {
    console.error('Error en POST /api/state:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        message: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
