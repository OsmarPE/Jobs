import { getJob } from '@/src/schemas/job';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const data = await getJob(+id)

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