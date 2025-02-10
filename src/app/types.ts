import { LucideIcon } from "lucide-react"

export type ItemMenu = {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items: {
      title: string
      url: string
    }[]
}

export type UserSession = {
  name: string
  email: string
  avatar: string
}