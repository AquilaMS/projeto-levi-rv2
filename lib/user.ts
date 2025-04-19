'use server'

import { auth } from "@/auth"
import { headers } from "next/headers"

export async function getUser() {

    const user = await auth.api.getSession({
        headers: await headers()
    })

    if (!user) 
        throw new Error("Não autenticado")

    return user?.user
}