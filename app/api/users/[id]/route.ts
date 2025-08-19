import { getUserById, updateUser } from "@/src/schemas/user";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const user = await getUserById(+id);
        return NextResponse.json({
            data: user,
            success: true,
            message: 'Usuario obtenido correctamente'
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: 'Error interno del servidor', success: false }
        );
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    const body = await request.json();
    
    try {
        const response = await updateUser(+id, body);
        
        if (response.rowCount === 0) {
            return NextResponse.json(
                { message: 'No se pudo actualizar el usuario', success: false }
            );
        }

        return NextResponse.json(
            { message: 'Usuario actualizado correctamente', success: true }
        );

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: 'Error interno del servidor', success: false }
        );

    }
    
}   