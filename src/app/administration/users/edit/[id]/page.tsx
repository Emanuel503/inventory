import { prisma } from "@/utils/prisma";
import { notFound } from "next/navigation";
import FormEditUser from "../components/FormEditUser";

export default async function UserEdit({params}: {params : Promise<{ id: string}>}) {
    const id = parseInt((await params).id)
    const user = await prisma.users.findUnique({
        where: { id },
    });
    const roles = await prisma.roles.findMany();
  
    if (!user || user.id == 1){
        notFound()
    }else{
        return <FormEditUser user={user} roles={roles}/>
    }
}
