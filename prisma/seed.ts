import { PrismaClient, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.log("Please provide an email address as an argument.");
    return;
  }

  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: UserRole.ADMIN },
    })
    console.log(`User ${user.email} is now an ADMIN.`)
  } catch (error) {
    console.error(`Failed to update user: ${error}`);
  }
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
