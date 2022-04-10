import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { createItem } from "~/models/item.server";

const prisma = new PrismaClient();

async function seed() {
  const email = "lance@example.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("lanceiscool", 10);

  await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await createItem(
    {
      title: "Frozen Mango",
      image: "./images/frozen-mango.jpg",
      price: "3.00",
    });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
