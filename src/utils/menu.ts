import { ItemMenu } from "@/app/types";
import { Bolt, GaugeCircle, Settings2 } from "lucide-react";

export const menu : ItemMenu[] = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: GaugeCircle,
      isActive: true,
      items: []
    },
    {
      title: "Administración",
      url: "/administration",
      icon: Bolt,
      isActive: true,
      items: [
        {
          title: "Usuarios",
          url: "/users",
        },
        {
          title: "Roles",
          url: "/roles",
        },
      ],
    },
    {
      title: "Configuración",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
      ],
    },
]