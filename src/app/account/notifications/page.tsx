import { decrypt } from "@/app/login/utils/session";
import { Title } from "@/components/ui/title";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import FormEditNotificationsConfig from "../components/FormEditNotificationsConfig";

export default async function NotificationsPage() {
  const cookie = (await cookies()).get("session")?.value;
  const session = cookie ? await decrypt(cookie): null;

  const notificatiosConfig = await prisma.notificationsConfigure.findUnique({
    where: {
      idUser: session!.user.id,
    },
  });

  return (
   <>
      <Title>Notificaciones</Title>
      
      <FormEditNotificationsConfig notificationsConfig={notificatiosConfig} user={session!.user}/>
   </>
  )
}
