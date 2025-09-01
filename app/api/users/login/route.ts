import { getUserByEmail } from "@/src/schemas/user";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import { verifyPassword } from "@/lib/auth";
export async function POST(request: NextRequest) {
    
    const body = await request.json();

    try {

        const user = await getUserByEmail(body.email);

        if (!user){
            return NextResponse.json({ message: "Email o contraseña son invalidos", status: 400 });
        }
        
        const { active, password, email } = user;


        if (!active) {
            return NextResponse.json({ message: "Esta cuenta no esta activada", status: 400 });
        }


        const isCorrectPassword = await verifyPassword(body.password, password);

        if (!isCorrectPassword) {
            return NextResponse.json({ message: "Contraseña invalido", status: 400 });
        }

        
        const token = jwt.sign({ email, id:user.id, name: user.name, avatar: user.avatar }, process.env.SECRET_KEY!, { expiresIn: '27d' });
        
        const cookie = await cookies();
        console.log(user.followUps);
        
        cookie.set('token', token);
        cookie.set('followUp', JSON.stringify(user.followUps));

        return NextResponse.json({ message: "Ha iniciado sesión correctamente", data: { token }, status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "No se pudo crear la cuenta" }, { status: 500 });
    }
}