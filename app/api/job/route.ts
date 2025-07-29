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
    console.log(error);
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}