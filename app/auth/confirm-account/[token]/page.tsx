import { getUserByToken } from "@/src/schemas/user";
import ConfirmAccount from "@/components/confirm-account/ConfirmAccount";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Confirmar cuenta',
  description: 'Confirmacion de cuenta a través de un código',
}
 

export default async function page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const data = await getUserByToken(token);

  if (!data) {
    return <div>Token invalido</div>;
  }

  return (
    <div className="code">
        <h1 className="font-semibold text-2xl text-secundary-landing">Activar cuenta</h1>
        <p className="text-gray-200">Ingrese el <span className="text-secundary-landing">código</span> que recibiste 
        en tu correo para poder activar tu cuenta</p>  
        <div className="mt-8">
            <ConfirmAccount token={token}/>
        </div>
    </div>
  );
}
