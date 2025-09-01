import { db } from "@/src";
import { bookmark } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest, { params }: { params: Promise< { id: string } > }) => {
    const { id } = await params;

    const data = await db.delete(bookmark).where(eq(bookmark.jobId, Number(id)));

    if (!data) {
        return NextResponse.json({message: 'No se encontró el trabajo guardado', success: false}, { status: 404 });
    }

    return NextResponse.json({message: 'Se ha eliminado el trabajo guardado', success: true}, { status: 200 });
};
