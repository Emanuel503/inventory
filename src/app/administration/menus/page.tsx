import { Title } from '@/components/ui/title'
import React from 'react'
import DataTableMenus from './components/DataTableMenus'
import { ColumnsDataTableMenus } from './components/ColumnsDataTableMenus'
import { prisma } from '@/utils/prisma';

export default async function page() {

  const menus = await prisma.menus.findMany({
    where:{
      menu: true,
      AND:{
        idFather: null, 
      }
    }
  });

  return (
    <>
        <Title>Gestion de menus del sistema</Title>

        <DataTableMenus columns={ColumnsDataTableMenus} data={menus} />
    </>
  )
}
