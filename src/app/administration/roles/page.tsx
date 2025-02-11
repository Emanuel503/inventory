import { PrismaClient } from '@prisma/client'
import DataTableRoles from './components/DataTableRoles';
import { ColumnsDataTableRoles } from './components/ColumnsDataTableRoles';

const prisma = new PrismaClient()

export default async function Roles() {
    const roles = await prisma.roles.findMany();
    await prisma.$disconnect();
    
    return <DataTableRoles columns={ColumnsDataTableRoles} data={roles} />
}
