import { PrismaClient } from "@prisma/client";
import FormAddUsers from "./components/FormAddUsers";

const prisma = new PrismaClient()

export default async function UsersAdd() {

    const roles = await prisma.roles.findMany()
    await prisma.$disconnect();
    
    return <FormAddUsers roles={roles}/>  
}
