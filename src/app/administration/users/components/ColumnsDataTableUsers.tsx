"use client"

import { ColumnDef } from "@tanstack/react-table"
import { List } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Users } from "@prisma/client"
import { ListCollapse, Pencil } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export const ColumnsDataTableUsers: ColumnDef<Users & { role?: { name: string }}>[] = [
  {
    accessorKey: "names",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "surnames",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Apellidos
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "rol",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rol
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row}) => {
        return <div>{row.original.role?.name}</div>
    }
  },
  {
    accessorKey: "enabled",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rol
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row}) => {
        return <Badge variant={row.original.enabled ? 'default' : 'destructive'}>{row.original.enabled ? 'Activo' : 'Desactivado'}</Badge>

    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de creación
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return new Date(row.original.updatedAt).toLocaleDateString()
    }
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de modificación
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return new Date(row.original.updatedAt).toLocaleDateString()
    }
  },
  {
    id: "actions",
    header:"Acciones",
    cell: ({row}) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <List/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild className="flex gap-x-3">
              <Link href={`/administration/users/show/${row.original.id}`}>
                  <ListCollapse/>
                  Ver detalles
              </Link>
            </DropdownMenuItem>
           { row.original.id !== 1 && (
              <>
                <DropdownMenuItem asChild className="flex gap-x-3">
                  <Link href={`/administration/users/edit/${row.original.id}`}>
                    <Pencil/>
                    Editar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="flex gap-x-3">
                  {/* <DeleteModal rol={row.original}/> */}
                </DropdownMenuItem>
              </>
            )
           }
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
