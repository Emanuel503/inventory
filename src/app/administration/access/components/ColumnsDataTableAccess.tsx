"use client"

import { ColumnDef } from "@tanstack/react-table"
import { List, Pencil } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Access } from "@prisma/client"
import { ListCollapse } from "lucide-react"
import Link from "next/link"
import DeleteModal from "./DeleteModal"

export const ColumnsDataTableAccess: ColumnDef<Access & { role?: { id: number, name: string },  menu?: { id: number, title: string }}>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Menu
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <Link href={`/administration/menus/show/${row.original.menu?.id}`}>{row.original.menu?.title}</Link>;
    }
  },
  {
    accessorKey: "name",
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
    cell: ({ row }) => {
      return <Link href={`/administration/roles/show/${row.original.role?.id}`}>{row.original.role?.name}</Link>;
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
              <Link href={`/administration/access/show/${row.original.id}`}>
                  <ListCollapse/>
                  Ver detalles
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="flex gap-x-3">
                <Link href={`/administration/users/edit/${row.original.id}`}>
                  <Pencil/>
                  Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="flex gap-x-3">
                <DeleteModal key={row.original.id} access={row.original}/>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
