import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Title } from "@/components/ui/title";

export default function NotificationsPage() {
  return (
   <>
     <Title>Notificaciones</Title>

    <div className="flex items-center space-x-2 mb-8">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Recibir notificaciones por correo electronico cuando se inicie sesion en un nuevo dispostivo.</Label>
    </div>

    <div className="flex items-center space-x-2 mb-8">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Recibir notificaciones por correo electronico cuando se cambie la contraseña.</Label>
    </div>

    <div className="flex items-center space-x-2 mb-8">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Recibir notificaciones por correo electronico de actualizaciones del sistema.</Label>
    </div>
   </>
  )
}
