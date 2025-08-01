import { getJobs } from '@/src/schemas/job';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
  try {
   
    const data = await getJobs()

    return NextResponse.json({ 
        message: data,
        status: 200
     });
     
  } catch (error) {
    
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}