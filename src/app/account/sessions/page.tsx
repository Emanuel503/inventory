import { decrypt } from "@/app/login/utils/session";
import { Title } from "@/components/ui/title";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import CardSession from "./components/CardSession";

export default async function SessionsPage() {

  const cookie = (await cookies()).get("session")?.value;
  const sessionCookie = cookie ? await decrypt(cookie): null;

  const activeSessions = await prisma.sessions.findMany({
    where: {
      idUser: sessionCookie?.user.id,
      revokedAt: null,
      expiresAt: {
        gt: new Date()
      }
    },
    orderBy: {
      id: "asc"
    }
  });

  const expiredSessions = await prisma.sessions.findMany({
    where: {
      idUser: sessionCookie?.user.id,
      revokedAt: null,
      expiresAt: {
        lt: new Date()
      }
    },
    orderBy: {
      id: "desc"
    },
    take: 6
  });

  const revokedSessions = await prisma.sessions.findMany({
    where: {
      idUser: sessionCookie?.user.id,
      revokedAt: {
        not: null
      }
    },
    orderBy: {
      id: "desc"
    },
    take: 6
  });

  return (
    <>
      <Title>Sesiones</Title>

      <p className="text-muted-foreground">
        Aquí puedes ver los dispositivos y ubicaciones donde has iniciado sesión. Si ves algo sospechoso, puedes cerrar la sesión de ese dispositivo.
      </p>
      
      <Accordion type="multiple" className="mb-10" defaultValue={["item-active"]}>
        <AccordionItem value="item-active">
          <AccordionTrigger>
            <p className="flex items-center gap-3">
              Activas
            </p>
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-12 gap-3">
            {
              activeSessions.length > 0 ? (
                activeSessions.map((session) => (
                  <CardSession className="col-span-12 md:col-span-6 lg:col-span-4" key={session.id} session={session} type="active" />
                ))
              ) : (
                <p className="col-span-12 text-muted-foreground">No hay sesiones activas.</p>
              )
            }
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-closed">
          <AccordionTrigger>
            <p className="flex items-center gap-3">
              Cerradas
            </p>
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-12 gap-3">
            {
              revokedSessions.length > 0 ? (
                revokedSessions.map((session) => (
                  <CardSession className="col-span-12 md:col-span-6 lg:col-span-4" key={session.id} session={session} type="revoked" />
                ))
              ) : (
                <p className="col-span-12 text-muted-foreground">No hay sesiones cerradas.</p>
              )
            }
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-expired">
          <AccordionTrigger>
            <p className="flex items-center gap-3">
              Expiradas
            </p>
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-12 gap-3">
            {
              expiredSessions.length > 0 ? (
                expiredSessions.map((session) => (
                  <CardSession className="col-span-12 md:col-span-6 lg:col-span-4" key={session.id} session={session} type="expired" />
                ))
              ) : (
                <p className="col-span-12 text-muted-foreground">No hay sesiones expiradas.</p>
              )
            }
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <p className="text-sm text-muted-foreground">
        Si necesitas ayuda, contacta a soporte.
      </p>
    </>
  )
}
