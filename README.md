This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## TODO

- Gestion de roles ✅
- Gestion de usuarios ✅
- Gestion de menus ✅
- Gestion de menus a roles ✅
- Validacion de rutas por rol ✅
- Login ✅
    - Validar token de session ✅
    - Enviar correo cuando se incie sesion (Si esta configurado) ✅
    - Terminar estilos de correo de creacion de usuario ✅
    - Confirmar correo electronico la primera vez que inicie sesion ✅
    - Cambiar contraseña cuando se incie sesion por primera vez ✅
- Perfil de usuario
    - Edicion de usuario: nombre, apellidos, contraseña, foto (Perfil) ✅
    - Gestion de sesiones (Sesiones) ✅
    - Gestion de preferencias de correos electronicos (Notificaciones) ✅
        - Cambios de contraseña ✅
        - Actualizaciones del sistema ✅
        - Inicio de sesiones ✅
    - Configuracion (Seguridad)
        - Habilitar el 2FA
- Configuracion de sistema
    - Agregar configuracion al sistema para que el 2FA: sea obligatorio o sea opcional

- Modulo de inventario
    - Gestion de categorias
    - Gestion de proveedores
    - Gestion de categorias
    - Gestion de inventario de productos 
    - Reportes de productos
    
- Modulo de gestion de restaurante 
    - Crear, modificar, detalles y eliminar mesas
    - Asignar mesas a clientes
    - Toma de orden a clientes
    - Generar factura
    - Reporte de ventas por rango de fechas

## Comandos

- npx prisma db seed
- npx prisma migrate