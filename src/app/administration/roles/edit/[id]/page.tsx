import { prisma } from '@/utils/prisma';
import FormEditRol from './components/FormEditRol';
import { notFound } from 'next/navigation';

export default async function RolShow({params}: {params : Promise<{ id: string}>}) {
    const id = parseInt((await params).id)
    const rol = await prisma.roles.findUnique({where: { id }});

    if (!rol || rol.id == 1){
      notFound()
    }else{
      return <FormEditRol rol={rol}/>
    }
}
