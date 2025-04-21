'use server'

import { revalidatePath } from "next/cache";
import { Permission, Role } from "../generated/prisma";
import { prisma } from "../prisma";

export async function getPermissions() {

    const permissions = await prisma.permission.findMany({
        orderBy: { role: 'asc' },
        include: {
            User: {
                select: {
                    id: true,
                    name: true,
                    permission: true,
                }
            }
        }
    });

    const groupedPermissions = permissions.reduce((acc, permission) => {
        const userId = permission.User?.id;
        if (!userId) return acc;

        if (!acc[userId]) {
            acc[userId] = {
                userId,
                name: permission.User?.name ?? '',
                permissions: []
            };
        }

        acc[userId].permissions.push({
            id: permission.id,
            role: permission.role,
            congregationId: permission.congregationId,
            departmentId: permission.deparmentId
        });

        return acc;
    }, {} as Record<string, { userId: string; name: string; permissions: any[] }>);

    return Object.values(groupedPermissions);
}

export async function addPermission(formData: FormData) {

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    if (!name) throw new Error('Nome é obrigatório');
    if (!email) throw new Error('Email é obrigatório');

    const userExists = await prisma.user.findUnique({
        where: { email }
    });

    if (userExists) throw new Error('Usuário já existe');

    await prisma.allowedUser.create({
        data: {
            id: crypto.randomUUID(),
            name,
            email
        }
    })

    revalidatePath('/permissions')
}

export async function updatePermission(formData: FormData) {

    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    if (!name) throw new Error('Nome é obrigatório');
    if (!email) throw new Error('Email é obrigatório');

    await prisma.allowedUser.update({
        where: { id },
        data: { name, email }
    })

    revalidatePath('/permissions')
}

export async function deletePermission(permission: Permission) {

    await prisma.permission.delete({
        where: { id: permission.id }
    })

    revalidatePath('/permissions')
}

export async function updateRole(formData: FormData) {
    
    const userId = formData.get('userId') as string;
    const role = formData.get('selectedRole') as Role;
    const targetCongregations = formData.getAll('congregations') as string[];
    const targetDepartments = formData.getAll('departments') as string[];

    if (!userId) throw new Error('ID do usuário é obrigatório');
    if (!role) throw new Error('O papel (role) é obrigatório');
    
    await prisma.permission.deleteMany({
        where: {
            userId: userId,
        }
    });

    await Promise.all(targetCongregations.map(async (congregationId) => {
        await prisma.permission.create({
            data: {
                userId,
                role,
                congregationId,
            }
        })
    }));

    await Promise.all(targetDepartments.map(async (departmentId) => {
        await prisma.permission.create({
            data: {
                userId,
                role,
                deparmentId: departmentId,
            }
        })
    }));
  
    revalidatePath('/permissions');
}