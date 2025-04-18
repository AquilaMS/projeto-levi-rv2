'use server'

import { redirect } from "next/navigation";

export async function resetPassword(formData: FormData) {
    try {
        redirect('/login')
    } catch (error) {
        throw new Error(error as any);
    }
}