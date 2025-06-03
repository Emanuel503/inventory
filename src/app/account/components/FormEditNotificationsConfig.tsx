'use client'

import { Button } from "@/components/ui/button";
import { NotificationsConfigure, Users } from "@prisma/client"
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { editNotificationsConfigAction } from "../utils/actions";

interface FormEditProfileProps {
  user: Users,
  notificationsConfig: NotificationsConfigure|null
}

export default function FormEditNotificationsConfig({user, notificationsConfig}: FormEditProfileProps) {
  
   const [state, formAction, pending] = useActionState(editNotificationsConfigAction, { success: false, message: "", errors: undefined });

   useEffect(() => {
    if (state.success) {
      toast.success(`${state.message}`, {
        closeButton: true,
        description: `Fecha de modificación ${new Date().toLocaleString()}`,
      });

    }else if(!state.success && state.errors !== undefined){
      toast.warning(`${state.message}`, {
        closeButton: true,
      });
    }
  }, [state]);

  return (
    <>
       <form action={formAction}>
         <div className="grid w-full items-center gap-5">
          <input name='idUser' hidden defaultValue={user.id}/>

          <div className="flex items-center space-x-2">
            <Switch id="emailSessions" name="emailSessions" defaultChecked={notificationsConfig ? notificationsConfig.emailSessions : true} />
            <Label htmlFor="emailSessions">Recibir notificaciones por correo electronico cuando se inicie sesion en un nuevo dispostivo.</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="passwordChange" name="passwordChange" defaultChecked={notificationsConfig ? notificationsConfig.passwordChange : true} />
            <Label htmlFor="passwordChange">Recibir notificaciones por correo electronico cuando se cambie la contraseña.</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="updatesSystem" name="updatesSystem" defaultChecked={notificationsConfig ? notificationsConfig.updatesSystem : true} />
            <Label htmlFor="updatesSystem">Recibir notificaciones por correo electronico de actualizaciones del sistema.</Label>
          </div>

          <div className="flex justify-between mt-10">
            <Button disabled={pending}>Guardar cambios</Button>
          </div>  
        </div>     
      </form>
    </>
  )
}
