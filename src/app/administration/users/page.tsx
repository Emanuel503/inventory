import DataTableUsers from "./components/DataTableUsers";
import { ColumnsDataTableUsers } from "./components/ColumnsDataTableUsers";
import { prisma } from "@/utils/prisma";
import { Title } from "@/components/ui/title";

export default async function Users() {
  const users = await prisma.users.findMany({
    include: {
      role : {
        select: {name: true}
      }
    }
  });

  return (
    <>
      <Title>Gestion de Usuarios</Title>
      
      <DataTableUsers columns={ColumnsDataTableUsers} data={users} buttonAdd />
    </>
  )
}
