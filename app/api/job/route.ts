import { getJobs } from '@/src/schemas/job';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
  try {
   
    const searchParams = new URL(request.url).searchParams;
    const search = searchParams.get('search') || undefined;
    const countryId = searchParams.get('countryId') || undefined;

    const data = await getJobs({ search, countryId: countryId ? Number(countryId) : undefined });

    return NextResponse.json({ 
        message: 'Trabajos obtenidos exitosamente',
        data,
        success:true
     });
     
  } catch (error) {
    
    return NextResponse.json(
      { 
        message: 'Error interno del servidor',
        success: false
      }
    );
  }
}