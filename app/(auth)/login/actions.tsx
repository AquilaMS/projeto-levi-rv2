'use server'

import { auth } from "@/auth";
import { authClient } from "@/lib/auth-client";

export async function loginWithEmail(formData: FormData) {

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const user = await auth.api.signInEmail({
        body: {
            email,
            password,
        }
    })
}