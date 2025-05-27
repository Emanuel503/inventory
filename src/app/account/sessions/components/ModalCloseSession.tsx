'use client'

import { Button } from "@/components/ui/button";
import { toast } from 'sonner'
import { closeSessionAction } from "../../utils/actions";
import { useActionState, useEffect } from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Trash2 } from "lucide-react";
import { Sessions } from "@prisma/client";
import { useRouter } from "next/navigation";

interface ModalCloseSessionProps {
    session: Sessions,
    disabled: boolean;
}

export default function ModalCloseSession({session, disabled} : ModalCloseSessionProps) {

  const [state, formAction, pending] = useActionState(closeSessionAction, { success: false, message: "", errors: undefined });
  const router = useRouter();

  useEffect(() => {
      if (state.success) {
        toast.success(`${state.message}`, {
          closeButton: true,
          description: `Fecha de eliminado ${new Date().toLocaleString()}`,
        });
        router.push("/account/sessions")
      }else if(!state.success && state.errors !== undefined){
        toast.warning(`${state.message}`, {
          closeButton: true,
        });
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant={"destructive"} disabled={disabled}>
                <Trash2 size={18}/>
                Eliminar
            </Button>
        </DialogTrigger>
        
        <DialogContent >
            <DialogHeader>
                <DialogTitle className="text-center text-red-500 mb-5">¿Estás seguro que quieres eliminar este sesion?</DialogTitle>
                <div className="mb-10">
                    Esta acción no se puede deshacer. Esto cerrara permanentemente la sesión.
                    
                    <p className="mt-8">
                        <span className="font-bold">Nombre del dispositvo: </span> {session.device}
                    </p>
                    <p>
                        <span className="font-bold">Fecha de creación: </span> {session.createdAt.toLocaleString()}
                    </p>
                </div>
                <DialogFooter>
                    <form action={formAction} className="flex gap-3">
                        <input name="id" hidden defaultValue={session.id}/>

                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button variant={"destructive"} type="submit" disabled={pending}>Eliminar</Button>
                    </form>
                </DialogFooter>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}
