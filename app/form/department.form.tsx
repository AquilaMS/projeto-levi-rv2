'use client';

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { addToast, Form, Select, SelectItem } from "@heroui/react";
import { useEffect, useState } from "react";
import { Congregation, Department } from "../generated/prisma";
import { addDepartment, deleteDepartment, updateDepartment } from "../department/actions";

export default function DepartmentForm({ department, onClose, congregations }: { department?: Department, onClose: () => void, congregations: Congregation[] }) {

    const [isLoading, setIsLoading] = useState(false);

    const [allCongregations, setAllCongregations] = useState<Congregation[]>(congregations || []);

    useEffect(() => {
        setAllCongregations(congregations || [])
    }, [])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

        setIsLoading(true);
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        formData.append('congregationId', formData.get('congregationId') as string);

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

    const handlerDelete = () => {
        if (!department) return;
        setIsLoading(true);
        deleteDepartment(department.id).then(() => {
            addToast({ title: 'Departamento excluído com sucesso', color: 'success' });
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
            <Input name="name" label="Nome" defaultValue={department ? department.name : ''} required />
            <Select
                name="congregationId"
                label="Congregação"
                defaultSelectedKeys={department ? [department.congregationId] : []}
                required
            >
                {allCongregations.map((congregation) => (
                    <SelectItem key={congregation.id}>
                        {congregation.name}
                    </SelectItem>
                ))}
            </Select>
            <div className="flex justify-end w-full gap-4">
                <Button color="danger" variant="light" onPress={handlerDelete}>excluir</Button>
                <Button isLoading={isLoading} color="primary" type="submit">
                    {department ? 'Atualizar' : 'Adicionar'}
                </Button>
            </div>
        </Form>
    </>
}