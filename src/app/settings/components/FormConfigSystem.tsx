'use client'

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { editSystemConfigAction } from "../utils/actions";
import { SystemConfigure } from "@prisma/client";

interface FormConfigSystemProps{
  systemConfigAction: SystemConfigure
}

export default function FormConfigSystem({systemConfigAction} : FormConfigSystemProps ) {

  const [state, formAction, pending] = useActionState(editSystemConfigAction, { success: false, message: "", errors: undefined });

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
          <div className="flex items-center space-x-2">
            <Switch id="twofactoreRequired" name="twofactoreRequired" defaultChecked={systemConfigAction.twofactoreRequired} />
            <Label htmlFor="twofactoreRequired">Doble autenticacion por correo electronico, obligatorio para todos los usuarios.</Label>
          </div>

          <div className="flex justify-between mt-10">
            <Button disabled={pending}>Guardar cambios</Button>
          </div>  
        </div>     
      </form>
    </>
  )
}
