'use server'

import { prisma } from "../prisma";

export async function addFund(formData: FormData) {

    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const monthPercentage = formData.get('monthPercentage') as string;
    const departments = formData.getAll(`departments`);
    const congregations = formData.getAll(`congregations`);

    if (!id) {

        await prisma.fund.create({
            data: {
                name,
                monthPercentage: monthPercentage ? parseFloat(monthPercentage) : 0,
                congregation: {
                    connect: congregations.map((cong) => ({ id: cong as string })),
                },
                department: {
                    connect: departments.map((dep) => ({ id: dep as string })),
                }
            },
        })
    }

}

export async function updateFund(formData: FormData) {

}