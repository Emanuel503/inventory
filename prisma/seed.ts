import { prisma } from "@/utils/prisma"

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
})
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
})