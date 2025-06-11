'use client'

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { editSecurityAction } from "../utils/actions";
import { SystemConfigure, Users } from "@prisma/client";

interface FormEditSecurityProps {
  user: Users,
  systemConfigure: SystemConfigure | null
}

export default function FormEditSecurity({user, systemConfigure}: FormEditSecurityProps) {
  const [state, formAction, pending] = useActionState(editSecurityAction, { success: false, message: "", errors: undefined });

   useEffect(() => {
    if (state.success) {
      toast.success(`${state.message}`, {
        closeButton: true,
        description: `Fecha de modificación ${new Date().toLocaleString()}`,
      });

    }
  }, [state]);

  return (
    <>
      <form action={formAction}>
         <div className="grid w-full items-center gap-5">
          {
              systemConfigure?.twofactoreRequired &&
              <p className="block text-muted-foreground text-red-500 ml-5">La verificación de dos pasos es obligatorio</p>
          }
          <div className="flex items-center space-x-2">
            {
              systemConfigure?.twofactoreRequired 
              ? <Switch id="twofactoreRequired" name="twofactoreRequired" defaultChecked={true} disabled={true}/>
              : <Switch id="twofactoreRequired" name="twofactoreRequired" defaultChecked={user.enabled}/>
            }
            <Label htmlFor="twofactoreRequired">Doble autenticacion por correo electronico</Label>
          </div>

          <div className="flex justify-between mt-10">
            <Button disabled={pending}>Guardar cambios</Button>
          </div>  
        </div>     
      </form>
    </>
  )
}
