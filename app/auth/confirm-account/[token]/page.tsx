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
        <ConfirmAccount token={token}/>
    </div>
  );
}
