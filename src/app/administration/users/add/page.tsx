import { prisma } from "@/utils/prisma";
import FormAddUsers from "./components/FormAddUsers";

export default async function UsersAdd() {

    const roles = await prisma.roles.findMany()
    
    return <FormAddUsers roles={roles}/>  
}
