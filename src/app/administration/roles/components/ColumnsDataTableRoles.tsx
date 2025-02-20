"use client"

import { ColumnDef } from "@tanstack/react-table"
import { List } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Roles } from "@prisma/client"
import { ListCollapse, Pencil } from "lucide-react"
import Link from "next/link"
import DeleteModal from "./DeleteModal"

export const ColumnsDataTableRoles: ColumnDef<Roles>[] = [
  {
    accessorKey: "name",
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
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descripción
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ getValue }) => {
      const description = getValue<string>() ?? "";
      return <span>{description.length > 30 ? `${description.slice(0, 30)}...` : description}</span>;
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
      return new Date(row.original.updatedAt).toLocaleString()
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
      return new Date(row.original.updatedAt).toLocaleString()
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
              <Link href={`/administration/roles/show/${row.original.id}`}>
                  <ListCollapse/>
                  Ver detalles
              </Link>
            </DropdownMenuItem>
           { row.original.id !== 1 && (
              <>
                <DropdownMenuItem asChild className="flex gap-x-3">
                  <Link href={`/administration/roles/edit/${row.original.id}`}>
                    <Pencil/>
                    Editar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="flex gap-x-3">
                  <DeleteModal key={row.original.id} rol={row.original}/>
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
