import { PrismaClient } from '@prisma/client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ListCollapse, Pencil, Plus, Trash2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { Title } from '@/components/ui/title'

const prisma = new PrismaClient()

export default async function Roles() {
    const roles = await prisma.roles.findMany();

    return (
    <>
        <Title>Gestion de Roles</Title>

        <Button className="float-end mb-4" asChild>
            <Link href={"/administration/roles/add"}><Plus/> Agregar nuevo</Link>
        </Button>

        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Nombre</TableHead>
                    <TableHead>Descripcion</TableHead>
                    <TableHead>Fecha de creación</TableHead>
                    <TableHead>Fecha de modificación</TableHead>
                    <TableHead className="text-center">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    roles.map((role) => (
                        <TableRow key={role.id} >
                            <TableCell>{role.name}</TableCell>
                            <TableCell>{role.description}</TableCell>
                            <TableCell>{role.name}</TableCell>
                            <TableCell>{role.name}</TableCell>
                            <TableCell className="flex justify-center gap-3">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button asChild size="icon">
                                                <Link href={`/administration/roles/show/${role.id}`}>
                                                    <ListCollapse/>
                                                </Link>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Detalles</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button asChild size="icon">
                                                <Link href={`/administration/roles/edit/${role.id}`}>
                                                    <Pencil/>
                                                </Link>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Editar</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button asChild size="icon" variant="destructive">
                                                <Link href={`/administration/roles/delete/${role.id}`}>
                                                    <Trash2/>
                                                </Link>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Eliminar</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </>
  )
}
