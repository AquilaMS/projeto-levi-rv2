'use client';

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { addToast, Form } from "@heroui/react";
import { useState } from "react";
import { Department } from "../generated/prisma";
import { addDepartment, updateDepartment } from "../department/actions";

export default function DepartmentForm({ department, onClose }: { department?: Department, onClose: () => void }) {

    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

        setIsLoading(true);
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        if (!department)
            addDepartment(formData).then(() => {
                addToast({ title: 'Departamento adicionado com sucesso', color: 'success' });
                onClose()
            }).catch((error) => {
                addToast({ title: error.message, color: 'danger' });
            }).finally(() => {
                setIsLoading(false)
            });

        if (department)
            updateDepartment(formData).then(() => {
                addToast({ title: 'Departamento atualizado com sucesso', color: 'success' });
                onClose()
            }).catch((error) => {
                addToast({ title: error.message, color: 'danger' });
            }).finally(() => {
                setIsLoading(false);
            });
    }

    return <>
        <Form onSubmit={handleSubmit}>
            <Input type="hidden" name="id" value={department ? department.id : ''}></Input>
            <Input name="name" label="Nome" defaultValue={department ? department.name : ''} />
            <div className="flex justify-end w-full">
                <Button isLoading={isLoading} color="primary" type="submit">
                    {department ? 'Atualizar' : 'Adicionar'}
                </Button>
            </div>
        </Form>
    </>
}