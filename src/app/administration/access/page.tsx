import { Title } from '@/components/ui/title'
import React from 'react'
import DataTableAccess from './components/DataTableAccess'
import { ColumnsDataTableAccess } from './components/ColumnsDataTableAccess'
import { prisma } from '@/utils/prisma';

export default async function page() {

  const access = await prisma.access.findMany({
    include: {
      menu: {
        select: {
          id: true,
          title: true
        }
      },
      role:{
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  return (
    <>
        <Title>Gestion de accesos</Title>

        <DataTableAccess columns={ColumnsDataTableAccess} data={access} buttonAdd />
    </>
  )
}
