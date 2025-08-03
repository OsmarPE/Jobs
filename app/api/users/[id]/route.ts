import { updateUser } from "@/src/schemas/user";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    const body = await request.json();
    
    try {
        const response = await updateUser(+id, body);
        
        return NextResponse.json(
            { message: 'Datos actualizados correctamente', status: 200 }
        );

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: 'Error interno del servidor', status: 500 }
        );

    }



    
}   