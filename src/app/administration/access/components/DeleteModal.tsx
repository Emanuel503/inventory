import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Access } from "@prisma/client"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { deleteAccessAction } from "../utils/actions";

export default function DeleteModal({access}: {access: Access & { role?: { id: number, name: string },  menu?: { id: number, title: string } }}) {
    const router = useRouter();
    const [stateDelete, formActionDelete, pendingDelete] = useActionState(deleteAccessAction, { success: false, message: "", errors: undefined });
    
    useEffect(() => {
      if (stateDelete.success) {
        toast.success(`${stateDelete.message}`, {
          closeButton: true,
          description: `Fecha de eliminado ${new Date().toLocaleString()}`,
        });

        router.push("/administration/access")
      }else if(!stateDelete.success && stateDelete.errors !== undefined){
        toast.warning(`${stateDelete.message}`, {
          closeButton: true,
        });
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stateDelete]);

    return (
        <Dialog>
            <DialogTrigger className="text-red-500 flex items-center gap-2 px-2 py-1 hover:bg-gray-100 w-full rounded">
                <Trash2 size={18}/>
                Eliminar
            </DialogTrigger>
            
            <DialogContent >
                <DialogHeader>
                    <DialogTitle className="text-center text-red-500 mb-5">¿Estás seguro que quieres eliminar este acceso?</DialogTitle>
                    <div>
                        Esta acción no se puede deshacer. Esto eliminará permanentemente este acceso.
                        
                        <p className="mt-8">
                            <span className="font-bold">Rol: </span> {access.role?.name}
                        </p>
                        <p>
                            <span className="font-bold">Menu: </span> {access.menu?.title}
                        </p>
                        <p>
                            <span className="font-bold">Fecha de creación: </span> {access.createdAt.toLocaleString()}
                        </p>
                    </div>
                    
                    <DialogFooter className="grid gap-5">
                        <div className="col-span-12" hidden={stateDelete.errors?.delete}>
                            <form action={formActionDelete} className="flex gap-3 justify-end">
                                <input name="id" hidden defaultValue={access.id}/>

                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Cancelar
                                    </Button>
                                </DialogClose>
                                <Button variant={"destructive"} type="submit" disabled={pendingDelete}>Eliminar</Button>
                            </form>
                        </div>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
