import { Menus, Users } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export type UserSession = {
  name: string
  email: string
  avatar: string
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  buttonAdd?: boolean;
}

export interface MenusChildren extends Menus {
    children: Menus[];
}

export type SessionPayload = {
  user: Users;
  expiresAt: Date;
  access: string[]
};

export interface ResponseData{
  success: boolean;
  message: string;
  valid: boolean;
  session: SessionPayload|null;
  twofactoreRequired: boolean|null;
}