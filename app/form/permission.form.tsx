'use client';

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { addToast, Form, Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { AllowedUser, Congregation, Department, Fund, Permission } from "../generated/prisma";
import { addPermission, deletePermission, updatePermission } from "../permissions/actions";

export default function PermissionForm({ permission, onClose, allowedUsers }: { permission?: Permission, onClose: () => void, allowedUsers?: AllowedUser[] }) {

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

        setIsLoading(true);
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        if (!permission)
            addPermission(formData).then(() => {
                addToast({ title: 'Permissão adicionada com sucesso', color: 'success' });
                onClose()
            }).catch((error) => {
                addToast({ title: error.message, color: 'danger' });
            }).finally(() => {
                setIsLoading(false)
            });

        if (permission)
            updatePermission(formData).then(() => {
                addToast({ title: 'Permissão atualizada com sucesso', color: 'success' });
                onClose()
            }).catch((error) => {
                addToast({ title: error.message, color: 'danger' });
            }).finally(() => {
                setIsLoading(false);
            });
    }

    const handleDeletePermission = async () => { 
        if (!permission) return;
        setIsLoadingDelete(true);
        await deletePermission(permission).then(() => {
            addToast({ title: 'Permissão excluída com sucesso', color: 'success' });
            onClose();
        }).catch((error) => {
            addToast({ title: error.message, color: 'danger' });
        }).finally(() => {
            setIsLoadingDelete(false);
        })
    }

    return <>
        <Form onSubmit={handleSubmit}>
            <Input type="hidden" name="id" value={permission ? permission.id : ''}></Input>
            <Input type="text" name="name" label="Nome" defaultValue={permission ? permission.name : ''} />
            <Input type="email" name="email" label="Email" defaultValue={permission ? permission.email : ''} />

            <div className="flex justify-end w-full gap-2">
                <Button variant="light" onPress={handleDeletePermission} color="danger" disabled={!permission} isLoading={isLoadingDelete}>excluir permissão</Button>
                <Button isLoading={isLoading} color="primary" type="submit">
                    {permission ? 'Atualizar' : 'Adicionar'}
                </Button>
            </div>

        </Form>
    </>
}