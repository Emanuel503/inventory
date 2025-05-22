import { Button } from '@/components/ui/button'
import { TriangleAlert } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='bg-white p-10 shadow rounded-lg m-10 flex items-center flex-col'>
      <div className='flex items-center gap-3'>
        <h2 className='text-4xl font-bold'>Not Found</h2>
        <TriangleAlert size={44}/>
      </div>
      <p className='text-lg'>No se encontro el recurso solicitado</p>
      
      <Image src="/bob_esponja_cavernicola.png" alt='Bob Esponja Cavernicola' width={500} height={500}></Image>

      <Button asChild>
        
        <Link href="/dashboard">Regresar al Inicio</Link>
      </Button>
      
    </div>
  )
}