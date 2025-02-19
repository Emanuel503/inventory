import DataTableRoles from './components/DataTableRoles';
import { ColumnsDataTableRoles } from './components/ColumnsDataTableRoles';
import { prisma } from '@/utils/prisma';

export default async function Roles() {
    const roles = await prisma.roles.findMany();
    
    return <DataTableRoles columns={ColumnsDataTableRoles} data={roles} />
}
