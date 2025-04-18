'use server';

import { PrismaClient } from "./generated/prisma";

export async function action() {
    // This is a server action
    // You can perform any server-side logic here
    // For example, you can fetch data from an API or perform database operations
    const prisma = new PrismaClient()

    await prisma.teste.create({
        data: {
            name: "Teste",
        }
    })

    return {}
}