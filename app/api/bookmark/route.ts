import { createBookmark } from "@/src/schemas/bookmark";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const { userId, jobId } = await req.json();

    const data = await createBookmark(userId,jobId);

    if (!data) {
        return NextResponse.json({ message: "So se pudo guardar el trabajo", success: false }, { status: 500 });
    }

    return NextResponse.json({ message: "Trabajo guardado a tus marcadores", success: true });
}