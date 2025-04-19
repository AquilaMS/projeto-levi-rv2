'use server'

import { getUser } from "@/lib/user";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

export async function getCongregations() {

    await getUser();

    const congregations = await prisma.congregation.findMany();
    return congregations;
}

export async function createCongregation(formData: FormData) {

    await getUser();

    const name = formData.get("name") as string;

    const congregation = await prisma.congregation.create({
        data: {
            name,
        }
    });

    return congregation;
}

export async function setCongregation(formData: FormData) {

    await getUser()

    if (!formData.get("id")) {
        await prisma.congregation.create({
            data: {
                name: formData.get("name") as string,
            }
        })
    }

    if (formData.get("id")) {
        await prisma.congregation.update({
            where: {
                id: formData.get("id") as string,
            },
            data: {
                name: formData.get("name") as string,
            }
        })
    }

    revalidatePath("/congregation")
    return true
}