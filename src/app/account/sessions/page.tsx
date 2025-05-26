import { Title } from "@/components/ui/title";
import { prisma } from "@/utils/prisma";

export default async function SessionsPage() {

  const sessions = await prisma.sessions.findMany({
    where: {
      idUser: 1
    },
    orderBy: {
      id: "asc"
    }
  });

  //TODO: Agregar condicion para que solo muestre todas las sesiones activas, las ultimas 5 expiradas y las ultimas 5 cerradas
  //TODO: utilizar un acordeon para mostrar las sesiones

  return (
    <>
      <Title>Sesiones</Title>

      <p className="text-sm text-muted-foreground">
        Aquí puedes ver los dispositivos y ubicaciones donde has iniciado sesión. Si ves algo sospechoso, puedes cerrar la sesión de ese dispositivo.
      </p>
      
      <div className="mb-10">
        {
          sessions.map((session) => (
            <div key={session.id} className="border-b border-gray-200 py-4">
              <p className="text-sm font-medium">{session.device}</p>
              <p className="text-xs text-muted-foreground">{session.ipAddress}</p>
              {
                session.revokedAt 
                ? <p className="text-xs text-muted-foreground">Fecha de cierre de sesion: {new Date(session.revokedAt).toLocaleString()}</p>
                : <p className="text-xs text-muted-foreground">Fecha de inicio de sesion: {new Date(session.createdAt).toLocaleString()}</p>
              }
              
            </div>
          ))
        }
      </div>

      <p className="text-sm text-muted-foreground">
        Si necesitas ayuda, contacta a soporte.
      </p>
    </>
  )
}
