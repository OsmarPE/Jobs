import { getFollowUp, getFollowUpsByUserId } from "@/src/schemas/followUp";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const userId = (await params).id;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

  const data = await getFollowUpsByUserId(+userId);

  return NextResponse.json({
    success: true,
    message:'Trabajos obtenidos correctamente',
    data
  });

}