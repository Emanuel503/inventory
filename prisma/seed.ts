import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";

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

    // Users seed
    await prisma.users.create({
      data: {
          id: 1,
          names: "Emanuel José",
          surnames: "Molina Zúnga",
          email: "emanueljosemolina@gmail.com",
          idRol: 1,
          username: "emolina",
          confirmedEmail: new Date(),
          password: await bcrypt.hash("12345678", 10),
      }
    })

    // SystemConfigure
    await prisma.systemConfigure.create({
      data: {
          id: 1,
          idUserUpdate: 1,
          twofactoreRequired: false,
          updatedAt: new Date()
      }
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
})
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
})