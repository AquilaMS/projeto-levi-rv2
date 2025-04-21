'use server'

import { PrismaClient } from "@/app/generated/prisma";
import { authClient } from "@/lib/auth-client";

export async function createAccountWithEmail(formData: FormData) {

    const prisma = new PrismaClient();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const userExists = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })

    const userAllowed = await prisma.allowedUser.findUnique({
        where: {
            email: email,
        }
    })

    if (!userAllowed) 
        throw new Error("Usuário não permitido")

    if (userExists)
        throw new Error("Usuário já existe")

    const userName = await prisma.allowedUser.findUnique({
        where: {
            email: email,
        }
    })

    await authClient.signUp.email({
        email,
        password,
        name: userName?.name!,
        callbackURL: "/dashboard"
    }).then(async () => {
        await prisma.permission.create({
            data: {
                User: {
                    connect: {
                        email: email,
                    }
                }
                
            }
        })
    })

}

