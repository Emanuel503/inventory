import { prisma } from "@/utils/prisma";
import FormAddAccess from "./components/FormAddAccess";

export default async function UsersAdd() {

    const roles = await prisma.roles.findMany({
        where:{
            id:{
                notIn: [1]
            }
        }
    })
    const menus = await prisma.menus.findMany({
        where:{
            menu: true,
            idFather: null
        }
    })
    
    return <FormAddAccess roles={roles} menus={menus}/>  
}
