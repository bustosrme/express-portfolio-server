import { PrismaClient } from "@prisma/client";
import { envs } from "../../config";
import { seedData } from "./data";

const prisma = new PrismaClient();

(async () => {
    try {
        await prisma.$connect();
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
})();

const randomBetween0AndX = (x: number) => {
    return Math.floor(Math.random() * x);
};

async function main() {
    // 1 - Borrar todo
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    // 1. Crear usuarios
    await prisma.user.createMany({
        data: seedData.users,
    });

    const users = await prisma.user.findMany();

    // 2. Crear categorias
    await prisma.category.createMany({
        data: seedData.categories.map((category) => {
            return {
                ...category,
                userId: users[0].id,
            };
        }),
    });

    const categories = await prisma.category.findMany();

    // // 3. Crear productos
    const products = await prisma.product.createMany({
        data: seedData.products.map((product) => {
            return {
                ...product,
                userId: users[randomBetween0AndX(seedData.users.length - 1)].id,
                categoryId:
                    categories[randomBetween0AndX(seedData.categories.length - 1)].id,
            };
        }),
    });

    console.log("SEEDED");
}
