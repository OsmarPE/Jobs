
import { sendMail } from '@/src/mail/send';
import { getUserByEmail, Register } from '@/src/schemas/user';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
  try {
   
    const data = await request.json();
    
    
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

    
    if (!response.rowCount){
        return NextResponse.json({ 
            message: 'No se ha podido registro',
            status: 400
         });
    }    
        
    const verifySendEmail = await sendMail({
        email: data.email,
        subject: 'Confirma tu cuenta',
        html: `<p>Por favor, ingrese el codigo ${response.code} para confirmar su cuenta. 
        </p><p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/auth/confirm-account/${response.token}">Confirmar cuenta</a></p>
        </p>
        `
    });


    return NextResponse.json({ 
        message: 'Hemos creado su cuenta correctamente, se ha enviado un correo a su bandeja de entrada para activar su cuenta',
        status: 200
     });
     
  } catch (error) {
    
    
    return NextResponse.json(
      { message: 'No se pudo crear la cuenta' },
      { status: 500 }
    );
  }
}