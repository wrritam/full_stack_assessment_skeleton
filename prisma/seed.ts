import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

async function main() {
  try {
    // Read the generated JSON data
    const rawData = fs.readFileSync("user_home_data.json", "utf-8");
    const data = JSON.parse(rawData);

    // Seed Users
    console.log("Seeding users...");
    await prisma.user.createMany({
      data: data.users,
      skipDuplicates: true,
    });

    // Seed Homes
    console.log("Seeding homes...");
    await prisma.home.createMany({
      data: data.homes,
      skipDuplicates: true,
    });

    // Seed UserHome relationships
    console.log("Seeding user-home relationships...");
    for (const userHome of data.userHomes) {
      await prisma.userHome.create({
        data: userHome,
      });
    }

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
