import { createSkills, deleteSkills, getSkills, NewSkills } from "@/src/schemas/skills";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const data: NewSkills = await request.json();
    
        // Validar datos requeridos
        if (!data.name) {
        return NextResponse.json(
            { message: 'El nombre es requerido' },
            { status: 400 }
        );
        }
    
        const result = await createSkills(data);
    
        if (!result.rowCount) {
        return NextResponse.json(
            { message: 'No se pudo crear la habilidad' },
            { status: 400 }
        );
        }
    
        return NextResponse.json({
        message: 'Habilidad creada exitosamente',
        status: 201
        });
    
    } catch (error) {
        console.error('Error creating skill:', error);
        return NextResponse.json(
        { message: 'Error interno del servidor al crear habilidad' },
        { status: 500 }
        );
    }
}

// GET - Obtener todas las habilidades
export async function GET(request: NextRequest) {    
    try {
        const skills = await getSkills();
        
        if (!skills) {
            return NextResponse.json(
            { message: 'No se encontraron habilidades' },
            { status: 404 }
            );
        }
    
        return NextResponse.json({
        skills,
        message: 'Habilidades obtenidos exitosamente',
        status: 200
        });
    
    } catch (error) {
        console.error('Error getting skills:', error);
        return NextResponse.json(
        { message: 'Error interno del servidor al obtener habilidades' },
        { status: 500 }
        );
    }

}

export async function DELETE(request: NextRequest) {
    try {
        const data = await request.json();

        // Validar datos requeridos
        if (!data.id) {
            return NextResponse.json(
                { message: 'El id es requerido' },
                { status: 400 }
            );
        }

        const result = await deleteSkills(data.id);

        if (!result.rowCount) {
            return NextResponse.json(
                { message: 'No se pudo eliminar la habilidad' },
                { status: 400 }
            );
        }

        return NextResponse.json({
            message: 'Habilidad eliminada exitosamente',
            status: 200
        });

    } catch (error) {
        console.error('Error deleting skill:', error);
        return NextResponse.json(
            { message: 'Error interno del servidor al eliminar habilidad' },
            { status: 500 }
        );
    }
}