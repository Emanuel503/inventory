import { Title } from "@/components/ui/title";
import FormEditSecurity from "../components/FormEditSecurity";
import { cookies } from "next/headers";
import { decrypt } from "@/app/login/utils/session";
import { prisma } from "@/utils/prisma";

export default async function SecurityPage() {
  const cookie = (await cookies()).get("session")?.value;
  const session = cookie ? await decrypt(cookie): null;

  const systemConfigure = await prisma.systemConfigure.findUnique({
    where: {
      id: 1
    }
  });

  return (
   <>
      <Title>Seguridad</Title>

      <FormEditSecurity user={session!.user} systemConfigure={systemConfigure}/>
   </>
  )
}
