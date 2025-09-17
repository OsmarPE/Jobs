import { getCountries } from "@/src/schemas/countries"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    
    const data = await getCountries()

    if (!data) {
        return NextResponse.json({ message: 'Paises no encontrados', success: false }, { status: 404 })
    }

    return NextResponse.json({ message: 'Paises encontrados', success: true, data })
}
