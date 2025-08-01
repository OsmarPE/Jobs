import { getUserByEmail } from "@/src/schemas/user";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
export async function POST(request: NextRequest) {
    
    const body = await request.json();

    try {

        const data = await getUserByEmail(body.email);

        if (!data){
            return NextResponse.json({ message: "Email o contraseña son invalidos", status: 400 });
        }
        
        const { active, password, email } = data;


        if (!active) {
            return NextResponse.json({ message: "Esta cuenta no esta activada", status: 400 });
        }


        if (password !== body.password) {
            return NextResponse.json({ message: "Contraseña invalido", status: 400 });
        }

        const token = jwt.sign({ email }, process.env.SECRET_KEY!, { expiresIn: '27d' });

        return NextResponse.json({ message: "Ha iniciado sesión correctamente", data: { token }, status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "No se pudo crear la cuenta" }, { status: 500 });
    }
}