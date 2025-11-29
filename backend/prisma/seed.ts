// prisma/seed.ts — versão correta e definitiva
import { prisma } from "../src/prisma/prisma.service.js"

async function main() {
  console.log("Criando usuários de teste...")

  const users = [
    { name: "Anderson", email: "anderson@pitchlab.com" },
    { name: "Maria",    email: "maria@pitchlab.com"    },
    { name: "João",     email: "joao@pitchlab.com"     },
  ]

  for (const user of users) {
    const exists = await prisma.user.findUnique({ where: { email: user.email } })

    if (!exists) {
      const created = await prisma.user.create({ data: user })
      console.log(`Criado: ${created.name} → ID: ${created.id}`)
    } else {
      console.log(`Já existe: ${exists.name} (${exists.id})`)
    }
    
  }

  console.log("Seed concluído!")
}

main()
  .catch(e => {
    console.error("Erro no seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })