import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Roles } from "@prisma/client"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { deleteRolAction } from "../utils/actions";

export default function DeleteModal({rol}: {rol: Roles}) {
    const [state, formAction, pending] = useActionState(deleteRolAction, { success: false, message: "", errors: undefined });
    const router = useRouter();
    
    useEffect(() => {
      if (state.success) {
        toast.success(`${state.message}`, {
          closeButton: true,
          description: `Fecha de eliminado ${new Date().toLocaleString()}`,
        });

        router.push("/administration/roles")
      }else if(!state.success && state.errors !== undefined){
        toast.warning(`${state.message}`, {
          closeButton: true,
        });
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    return (
        <Dialog>
            <DialogTrigger className="text-red-500 flex items-center gap-2 px-2 py-1 hover:bg-gray-100 w-full rounded">
                <Trash2 size={18}/>
                Eliminar
            </DialogTrigger>
            
            <DialogContent >
                <DialogHeader>
                    <DialogTitle className="text-center text-red-500 mb-5">¿Estás seguro que quieres eliminar este rol?</DialogTitle>
                    <div>
                        Esta acción no se puede deshacer. Esto eliminará permanentemente este rol y su información asociada.
                        
                        <p className="mt-8">
                            <span className="font-bold">Nombre del rol: </span> {rol.name}
                        </p>
                        <p>
                            <span className="font-bold">Fecha de creación: </span> {rol.createdAt.toLocaleString()}
                        </p>
                    </div>
                    <DialogFooter>
                        <form action={formAction} className="flex gap-3">
                            <input name="id" hidden defaultValue={rol.id}/>

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
