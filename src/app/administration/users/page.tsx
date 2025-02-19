import { PrismaClient } from "@prisma/client"
import DataTableUsers from "./components/DataTableUsers";
import { ColumnsDataTableUsers } from "./components/ColumnsDataTableUsers";

const prisma = new PrismaClient()

export default async function Users() {
  const users = await prisma.users.findMany({
    include: {
      role : {
        select: {name: true}
      }
    }
  });
  await prisma.$disconnect();

  return <DataTableUsers columns={ColumnsDataTableUsers} data={users} />
}
