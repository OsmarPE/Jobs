
import { getEducationById, updateEducation } from '@/src/schemas/education';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(  
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ message: 'El ID de educación es requerido', success: false, data: null }, { status: 400 });
  }
  try {
    const data = await getEducationById(+id);
    if (!data) {
      return NextResponse.json({ message: 'Educación no encontrada', success: false, data: null }, { status: 404 });
    }
    return NextResponse.json({ message: 'Educación obtenida exitosamente', success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching education:', error);
    return NextResponse.json({ message: 'Error al obtener la educación', success: false, data: null }, { status: 500 });
  }
}


export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ message: 'El ID de educación es requerido', success: false, data: null }, { status: 400 });
  }
  try {
    const data = await request.json();
    const updatedEducation = await updateEducation(+id, data);
    if (!updatedEducation) {
      return NextResponse.json({ message: 'Educación no encontrada', success: false, data: null }, { status: 404 });
    }
    return NextResponse.json({ message: 'Educación actualizada exitosamente', success: true, data: updatedEducation }, { status: 200 });
  } catch (error) {
    console.error('Error updating education:', error);
    return NextResponse.json({ message: 'Error al actualizar la educación', success: false, data: null }, { status: 500 });
  }
}
