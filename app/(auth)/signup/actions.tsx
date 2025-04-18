'use server'

import { PrismaClient } from "@/app/generated/prisma";
import { authClient } from "@/lib/auth-client";

export async function createAccountWithEmail(formData: FormData) {

    const prisma = new PrismaClient();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "/dashboard"
    })

}

