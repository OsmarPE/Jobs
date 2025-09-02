import { getUserByToken } from "@/lib/auth";
import { db } from "@/src";
import { bookmark } from "@/src/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest, { params }: { params: Promise< { id: string } > }) => {
    const { id } = await params;

    const user = await getUserByToken();

    if (!user) {
        return NextResponse.json({message: 'Usuario no autorizado', success: false}, { status: 401 });
    }

    const result = await db.delete(bookmark)
            .where(and(
                eq(bookmark.jobId, Number(id)),
                eq(bookmark.userId, user?.id)
            ));
        

    if (result.rowCount === 0) {
        return NextResponse.json({message: 'No se encontró el trabajo guardado', success: false}, { status: 404 });
    }

    return NextResponse.json({message: 'Se ha eliminado el trabajo guardado', success: true}, { status: 200 });
};
