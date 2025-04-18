import { auth } from "@/auth";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";

export async function getTransactions() {

    const user = await auth.api.getSession({
        headers: await headers()
    })
    console.log('6',user?.user.email)
}