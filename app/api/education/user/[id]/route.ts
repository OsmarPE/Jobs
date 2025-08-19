
import { getEducationsByUserId } from '@/src/schemas/education'
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ message: 'User ID is required', status: false, data: null }, { status: 400 });
  }
  try {
    const data = await getEducationsByUserId(+id);
    if (!data) {
      return NextResponse.json({ message: 'Educations not found', status: false, data: null }, { status: 404 });
    }
    return NextResponse.json({ message: 'Educations fetched successfully', status: true, data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching educations:', error);
    return NextResponse.json({ message: 'Error fetching educations', status: false, data: null }, { status: 500 });
  }
}
