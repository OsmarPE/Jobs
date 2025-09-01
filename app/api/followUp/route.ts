import { createFollowUp } from "@/src/schemas/followUp";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const { userId, jobId, status } = await req.json();

        if (!userId || !jobId || !status) {
            return NextResponse.json({ message: 'Faltan datos requeridos', success: false }, { status: 400 });
        }

        const data = await createFollowUp({ userId, jobId, status });

        if (!data) {
            return NextResponse.json({ message: 'No se pudo enviar tu postulación a la empresa', success: false }, { status: 500 });
        }

        return NextResponse.json({ message: 'Gracias por postularte a la vacante, hemos recibido tu CV correctamente y nuestro equipo de Recursos Humanos lo revisará.', success: true }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: 'Error interno del servidor', success: false }, { status: 500 });
    }
};