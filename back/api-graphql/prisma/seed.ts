import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)
  let user: any
  user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: "dev.fullstack.js0311@gmail.com",
        password: "devfullstack0311",
        name: "devfullstack0311"
      },
    })
  }

  console.log(`Created user with id: ${user?.id}`)
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
