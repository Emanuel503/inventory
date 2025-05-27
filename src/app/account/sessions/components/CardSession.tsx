import { Button } from "@/components/ui/button";
import { Sessions } from "@prisma/client";
import { UAParser } from "ua-parser-js";

type CardSessionProps = {
  className?: string;
  session: Sessions;
  type: "active" | "expired" | "revoked";
};

export default function CardSession({session, className, type}: CardSessionProps) {

  const uaParser = new UAParser();
  const userAgent = uaParser.setUA(session.userAgent).getResult();

  return (
    <div className={`flex flex-col justify-center p-5 border rounded-xl shadow-lg ${className}`}>
        <p className="text-muted-foreground"><span className="font-semibold">Direccion IP:</span> {session.ipAddress}</p>
        <p className="text-muted-foreground"><span className="font-semibold">Navegador:</span> {userAgent.browser.toString()} {userAgent.engine.toString()}</p>
        <p className="text-muted-foreground"><span className="font-semibold">Sistema:</span> {userAgent.os.toString()}</p>

        <br/>

        <p className="text-muted-foreground"><span className="font-semibold">Fecha de inicio de sesion:</span> {new Date(session.createdAt).toLocaleString()}</p>

        {
          type == 'active' || type == 'expired' && <p className="text-muted-foreground"><span className="font-semibold">Fecha de expiración:</span> {new Date(session.expiresAt).toLocaleString()}</p>
        }

        {
          type == 'revoked' && <p className="text-muted-foreground"><span className="font-semibold">Fecha de cierre de sesión:</span> {session.revokedAt ? new Date(session.revokedAt).toLocaleString(): ''}</p>
        }

        {
          type == 'active' && <Button className="mt-5" variant="destructive">Cerrar sesion</Button>
        }
    </div>
  )
}
