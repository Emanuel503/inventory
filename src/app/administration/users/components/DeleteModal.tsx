import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Users } from "@prisma/client"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { deleteUserAction, desactiveUserAction } from "../utils/actions";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

export default function DeleteModal({user}: {user: Users}) {
    const router = useRouter();
    const [stateDelete, formActionDelete, pendingDelete] = useActionState(deleteUserAction, { success: false, message: "", errors: undefined });
    const [stateDesactive, formActionDesactive, pendingDesactive] = useActionState(desactiveUserAction, { success: false, message: "", errors: undefined });
    
    useEffect(() => {
      if (stateDelete.success) {
        toast.success(`${stateDelete.message}`, {
          closeButton: true,
          description: `Fecha de eliminado ${new Date().toLocaleString()}`,
        });

        router.push("/administration/users")
      }else if(!stateDelete.success && stateDelete.errors !== undefined){
        toast.warning(`${stateDelete.message}`, {
          closeButton: true,
        });
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stateDelete]);

    useEffect(() => {
        if (stateDesactive.success) {
          toast.success(`${stateDesactive.message}`, {
            closeButton: true,
            description: `Fecha de modificación ${new Date().toLocaleString()}`,
          });
  
          router.push("/administration/users")
        }else if(!stateDesactive.success && stateDesactive.errors !== undefined){
          toast.warning(`${stateDesactive.message}`, {
            closeButton: true,
          });
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stateDesactive]);

    return (
        <Dialog>
            <DialogTrigger className="text-red-500 flex items-center gap-2 px-2 py-1 hover:bg-gray-100 w-full rounded">
                <Trash2 size={18}/>
                Eliminar
            </DialogTrigger>
            
            <DialogContent >
                <DialogHeader>
                    <DialogTitle className="text-center text-red-500 mb-5">¿Estás seguro que quieres eliminar este usuario?</DialogTitle>
                    <div>
                        Esta acción no se puede deshacer. Esto eliminará permanentemente este usuario.
                        
                        <p className="mt-8">
                            <span className="font-bold">Nombre: </span> {user.names} {user.surnames}
                        </p>
                        <p>
                            <span className="font-bold">Nombre de usuario: </span> {user.username}
                        </p>
                        <p>
                            <span className="font-bold">Email: </span> {user.email}
                        </p>
                        <p>
                            <span className="font-bold">Fecha de creación: </span> {user.createdAt.toLocaleString()}
                        </p>
                        <div className="mb-4">
                            <Label className="font-bold mr-2">Estado:</Label>
                            <Badge variant={user?.enabled ? "default": "destructive"}>
                                {user?.enabled ? "Activo": "Desactivado"}
                            </Badge>
                        </div>
                    </div>
                    
                    <DialogFooter className="grid gap-5">
                        <div className="col-span-12" hidden={stateDelete.errors?.delete}>
                            <form action={formActionDelete} className="flex gap-3 justify-end">
                                <input name="id" hidden defaultValue={user.id}/>

                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Cancelar
                                    </Button>
                                </DialogClose>
                                <Button variant={"destructive"} type="submit" disabled={pendingDelete}>Eliminar</Button>
                            </form>
                        </div>
                       
                        <div className="col-span-12" hidden={!stateDelete.errors?.delete}>
                            <h4 className="text-red-500">El usuario esta siendo utilizado en otros registros, no puedes eliminarlo.</h4>
                            <h4 className="font-bold text-center my-4">¿Quieres desactivar el usuario?</h4>
                            <form action={formActionDesactive} className="flex gap-3 justify-end">
                                <input name="id" hidden defaultValue={user.id}/>

                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Cancelar
                                    </Button>
                                </DialogClose>
                                <Button variant={"destructive"} type="submit" disabled={pendingDesactive}>Desactivar</Button>
                            </form>
                        </div>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
