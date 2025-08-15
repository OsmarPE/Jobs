import { getSkillsByUserId } from "@/src/schemas/skills";
import { NextRequest, NextResponse } from "next/server"


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const userId = parseInt(params.id)

    try {
        const data = await getSkillsByUserId(userId)

        if (data.length === 0) {
            return NextResponse.json(
                { message: 'No se encontraron habilidades para este usuario' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            data,
            message: 'Habilidades obtenidas exitosamente',
            status: 200
        });

    } catch (error) {
        console.error('Error getting skills by user ID:', error);
        return NextResponse.json(
            { message: 'Error interno del servidor al obtener habilidades' },
            { status: 500 }
        );
    }
}

