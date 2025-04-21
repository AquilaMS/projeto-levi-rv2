'use client';

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { addToast, Form, Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { Congregation, Department, Fund } from "../generated/prisma";
import { addFund, updateFund } from "../funds/actions";

export default function FundForm({ fund: fund, congregations, departments, onClose }: { fund?: Fund, congregations?: Congregation[], departments?: Department[], onClose: () => void }) {

    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

        setIsLoading(true);
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        if (!fund)
            addFund(formData).then(() => {
                addToast({ title: 'Fundo adicionado com sucesso', color: 'success' });
                onClose()
            }).catch((error) => {
                addToast({ title: error.message, color: 'danger' });
            }).finally(() => {
                setIsLoading(false)
            });

        if (fund)
            updateFund(formData).then(() => {
                addToast({ title: 'Fundo atualizado com sucesso', color: 'success' });
                onClose()
            }).catch((error) => {
                addToast({ title: error.message, color: 'danger' });
            }).finally(() => {
                setIsLoading(false);
            });
    }

    return <>
        <Form onSubmit={handleSubmit}>
            <Input type="hidden" name="id" value={fund ? fund.id : ''}></Input>
            <Input name="name" label="Nome" defaultValue={fund ? fund.name : ''} />
            <Select
                name="departments"
                label="Departamento"
                placeholder="Selecione um departamento"
                selectionMode="multiple"
            >
                {departments ? departments.map((dep: Department) => (
                    <SelectItem key={dep.id}>{dep.name}</SelectItem>
                )) : []}
            </Select>
            <Select
                name="congregations"
                label="Congregação"
                placeholder="Selecione uma congregação"
                selectionMode="multiple"
            >
                {congregations ? congregations.map((cong: Congregation) => (
                    <SelectItem key={cong.id}>{cong.name}</SelectItem>
                )) : []}
            </Select>
            <Input
                name="monthPercentage"
                label="Rendimento Mensal" defaultValue={fund ? String(fund.monthPercentage) : ''}
                endContent={<span>%</span>}
            />
            <div className="flex justify-end w-full">
                <Button isLoading={isLoading} color="primary" type="submit">
                    {fund ? 'Atualizar' : 'Adicionar'}
                </Button>
            </div>
        </Form>
    </>
}