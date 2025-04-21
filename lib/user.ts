'use server'

import { prisma } from "@/app/prisma"
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

export async function getAllUsers() {
    const user = await getUser()

    if (!user) 
        throw new Error("Não autenticado")

    const users = await prisma.user.findMany()

    return users
}

export async function getAllowedUsers() { 

    const user = await getUser()

    if (!user) 
        throw new Error("Não autenticado")

   const allowedUsers = await prisma.allowedUser.findMany()

    return allowedUsers
}