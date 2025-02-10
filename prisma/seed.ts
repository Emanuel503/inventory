import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    //Roles seed
    await prisma.roles.create({
        data: {
            id: 1,
            name: 'Admin',
            description: 'Administrador del sistema'
        }
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
})
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})