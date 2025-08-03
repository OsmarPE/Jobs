import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

     const response = NextResponse.json({ 
        message: 'Sesión cerrada correctamente', 
        status: 200 
    });

    response.cookies.delete('token');
    
    return response
}