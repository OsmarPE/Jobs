import { getEducations } from "@/src/schemas/education"
import { NextRequest, NextResponse } from "next/server"


export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    if (!userId) {
        return NextResponse.json({ message: 'User ID is required', status: false, data: null }, { status: 400 })
    }
    try {
        const data = await getEducations()
        return NextResponse.json({ message: 'Educations fetched successfully', status: true, data }, { status: 200 })
    
    } catch (error) {
        console.error('Error fetching education:', error)
        return NextResponse.json({ message: 'Error fetching education', status: false, data: null }, { status: 500 })
    }
}
