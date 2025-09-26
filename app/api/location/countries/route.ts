import { getCountries, getLocations } from "@/src/schemas/location";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request: NextRequest) => {

    const data = await getCountries();

    return NextResponse.json({ message: "Location API", data, success:true }, { status: 200 });
}