import { getUserByEmail, Register } from '@/src/schemas/user';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
  try {
   
    const data = await request.json();
    console.log(data);
    

    const findUser = await getUserByEmail(data.email);

    if (findUser) {

        const { token } = findUser;

        if (token) {
            return NextResponse.json({ 
                message: 'Active tu cuenta para poder iniciar sesión',
                status: 400
             });
        }

        return NextResponse.json({ 
            message: 'Este correo ya esta registrado',
            status: 400
         });
    }

    const response = await Register(data);
    

    return NextResponse.json({ 
        message: 'Hemos creado su cuenta correctamente, se ha enviado un correo a su bandeja de entrada para activar su cuenta',
        status: 200
     });
     
  } catch (error) {
    
    console.log(error);
    return NextResponse.json(
      { error: 'No se pudo crear la cuenta' },
      { status: 500 }
    );
  }
}