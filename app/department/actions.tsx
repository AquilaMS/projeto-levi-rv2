'use server'

import { getUser } from "@/lib/user";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { Congregation } from "../generated/prisma";

export async function getDepartments() {
    const user = await getUser();

    if (!user) {
        return [];
    }

    const departments = await prisma.department.findMany();

    return departments;
}

export async function addDepartment(formData: FormData) {

    const name = formData.get('name') as string;
    const id = formData.get('id') as string;
    const congregationId = formData.get('congregationId') as string;

    if (!name) throw new Error('Nome é obrigatório');
    if (!congregationId) throw new Error('Congregação é obrigatória');

    if (id) {
        await prisma.department.update({
            where: { id },
            data: {
                name,
                congregation: {
                    connect: { id: congregationId }
                }
            }
        });
    } else {
        await prisma.department.create({
            data: {
                name,
                congregation: {
                    connect: { id: congregationId }
                }
            }
        });
    }

    revalidatePath('/department')
}

export async function updateDepartment(formData: FormData) {

    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const congregationId = formData.get('congregationId') as string;

    if (!name) throw new Error('Nome é obrigatório');

    await prisma.department.update({
        where: { id },
        data: {
            name,
            congregation: {
                connect: { id: congregationId }
            }
        }
    });

    revalidatePath('/department')
}

export async function deleteDepartment(id: string) {

    if (!id) throw new Error('ID é obrigatório');

    await prisma.department.delete({
        where: { id }
    });

    revalidatePath('/department')
}