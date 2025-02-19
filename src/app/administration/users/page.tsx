import DataTableUsers from "./components/DataTableUsers";
import { ColumnsDataTableUsers } from "./components/ColumnsDataTableUsers";
import { prisma } from "@/utils/prisma";

export default async function Users() {
  const users = await prisma.users.findMany({
    include: {
      role : {
        select: {name: true}
      }
    }
  });

  return <DataTableUsers columns={ColumnsDataTableUsers} data={users} />
}
