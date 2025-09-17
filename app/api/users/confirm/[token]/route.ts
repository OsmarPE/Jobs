import { activateUser, getUserByToken } from "@/src/schemas/user";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {

    const { token } = await params;
    const body = await request.json();
    const code = body.code;

    try {

        const data = await getUserByToken(token);        

        if (!data) {
            return NextResponse.json({ message: "Token invalido", status: 400 });
        }

        if (data.code !== code) {
            return NextResponse.json({ message: "Token invalido", status: 400 });
        }
        
        const isActive = await activateUser(data.id);

        const cookie = await cookies();
        

        return NextResponse.json({ message: "Cuenta activada correctamente", data, status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "No se pudo crear la cuenta" }, { status: 500 });
    }
}