import { NextRequest, NextResponse } from 'next/server';
import { 
  getCities, 
  createCity, 
  createCitySchema,
  citiesByStateSchema,
  searchCitiesSchema,
  getCitiesByStateId,
  searchCities 
} from '@/src/schemas/cities';

// GET /api/cities - Obtener todas las ciudades, por estado, o buscar por nombre
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const stateId = searchParams.get('stateId');
    const search = searchParams.get('search');

    // Si se proporciona search, buscar ciudades por nombre
    if (search) {
      const validation = searchCitiesSchema.safeParse({ 
        name: search,
        stateId: stateId || undefined 
      });
      
      if (!validation.success) {
        return NextResponse.json(
          { 
            error: 'Parámetros de búsqueda inválidos',
            details: validation.error.issues 
          },
          { status: 400 }
        );
      }

      const cities = await searchCities(validation.data.name, validation.data.stateId);
      return NextResponse.json({
        success: true,
        data: cities,
        message: `Ciudades encontradas para "${search}"`
      });
    }

    // Si se proporciona stateId, obtener ciudades por estado
    if (stateId) {
      const validation = citiesByStateSchema.safeParse({ stateId });
      
      if (!validation.success) {
        return NextResponse.json(
          { 
            error: 'Parámetros inválidos',
            details: validation.error.issues 
          },
          { status: 400 }
        );
      }

      const cities = await getCitiesByStateId(validation.data.stateId);
      return NextResponse.json({
        success: true,
        data: cities,
        message: `Ciudades obtenidas para el estado ${stateId}`
      });
    }

    // Obtener todas las ciudades
    const cities = await getCities();
    return NextResponse.json({
      success: true,
      data: cities,
      message: 'Ciudades obtenidas exitosamente'
    });

  } catch (error) {
    console.error('Error en GET /api/cities:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        message: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// POST /api/cities - Crear una nueva ciudad
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar los datos de entrada
    const validation = createCitySchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Datos de entrada inválidos',
          details: validation.error.issues 
        },
        { status: 400 }
      );
    }

    // Crear la ciudad
    const newCity = await createCity(validation.data);
    
    return NextResponse.json({
      success: true,
      data: newCity,
      message: 'Ciudad creada exitosamente'
    }, { status: 201 });

  } catch (error) {
    console.error('Error en POST /api/cities:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        message: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
