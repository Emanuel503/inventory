import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Form2fa from "./components/Form2fa"
import { cookies } from "next/headers";
import { decrypt } from "../login/utils/session";

export default async function TwoFactorAuthPage() {
  const cookie = (await cookies()).get("session")?.value;
  const session = cookie ? await decrypt(cookie): null;

  return (
    <div className='flex flex-col items-center justify-center gap-10  m-40'>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="mb-4 text-2xl">Verificación de dos pasos</CardTitle>
          <CardDescription>
            Ingresa el codigo de confirmacion que ha sido enviado a tu correo electronico para poder continuar.<br/>
            Tienes dos minutos para ingresar el codigo de confirmacion.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form2fa user={session!.user}/>
        </CardContent>
      </Card>
    </div>
  )
}
