import { getCitiesByCountry, getCountries, getLocations } from "@/src/schemas/location";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request: NextRequest, { params }: { params: Promise<{ country: string }> }) => {

    const { country } = await params;

    if (!country) {
        return NextResponse.json({ message: "Country is required", success: false }, { status: 400 });
    }

    const data = await getCitiesByCountry(country as string);

    return NextResponse.json({ message: `Ciudades de ${country}`, data, success:true }, { status: 200 });
}