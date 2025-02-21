import DataTableRoles from './components/DataTableRoles';
import { ColumnsDataTableRoles } from './components/ColumnsDataTableRoles';
import { prisma } from '@/utils/prisma';
import { Title } from '@/components/ui/title';

export default async function Roles() {
    const roles = await prisma.roles.findMany();
    
    return (
        <>
            <Title>Gestion de Roles</Title>

            <DataTableRoles columns={ColumnsDataTableRoles} data={roles} buttonAdd/>
        </>
    )
}
