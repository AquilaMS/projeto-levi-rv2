'use server'

import { getUser } from "@/lib/user";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

export async function getDepartments() {

    const user = await getUser();

    const departments = await prisma.department.findMany({
        where: {
            Fund: {
                every: {
                    department: {
                        Permission: {
                            every: {
                                userId: user?.id,
                            }
                        }
                    }
                }
            }
        }
    });

    return departments;
}

export async function addDepartment(formData: FormData) {

    const name = formData.get('name') as string;
    const id = formData.get('id') as string;

    if (!name) throw new Error('Nome é obrigatório');

    if (id) {
        await prisma.department.update({
            where: { id },
            data: { name }
        });
    } else {
        await prisma.department.create({
            data: { name }
        });
    }

    revalidatePath('/department')
}

export async function updateDepartment(formData: FormData) {

    const name = formData.get('name') as string;
    const id = formData.get('id') as string;

    if (!name) throw new Error('Nome é obrigatório');

    await prisma.department.update({
        where: { id },
        data: { name }
    });

    revalidatePath('/department')
}