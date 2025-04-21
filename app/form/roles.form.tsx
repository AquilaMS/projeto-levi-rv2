'use client'

import { Avatar, Button, Card, CardBody, Checkbox, CheckboxGroup, Form } from "@heroui/react";
import { MdAttachMoney } from "react-icons/md";
import { GiSheep } from "react-icons/gi";
import { MdOutlineManageSearch } from "react-icons/md";
import { MdLeaderboard } from "react-icons/md";
import { useEffect, useState } from "react";
import { Congregation, Department, Role } from "../generated/prisma";
import { updateRole } from "../permissions/actions";

export default function RolesForm({ userId, departments, congregations, permissions }: { userId?: any, departments?: Department[], congregations?: Congregation[], permissions?: any[] }) {

    const [isLoading, setIsLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [selectedCongregations, setSelectedCongregations] = useState<string[]>([]);
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

    useEffect(() => {
        if (permissions && permissions.length > 0) {
            setSelectedRole(permissions[0].role as Role);
            setSelectedDepartments(permissions.map((permission: any) => permission.departmentId).filter(Boolean));
            setSelectedCongregations(permissions.map((permission: any) => permission.congregationId).filter(Boolean));
        }
    }, [userId]);

    const roles = [
        {
            type: Role.TESOUREIRO,
            title: 'Tesoureiro',
            description: "Permite criar Movimentações financeiras para Igreja/Congregação ou certos Departamentos.",
            icon: <MdAttachMoney className="text-xl" />
        },
        {
            type: Role.PASTOR,
            title: 'Pastor',
            description: "Permite acesso completo à plataforma",
            icon: <GiSheep className="text-xl" />
        },
        {
            type: Role.ADMIN,
            title: 'Administrador',
            description: "Permite acesso completo à plataforma",
            icon: <MdOutlineManageSearch className="text-xl" />
        },
        {
            type: Role.LIDER,
            title: 'Líder',
            description: "Permite acesso a certos Departamentos e Congregações. Sem acesso ao módulo Financeiro.",
            icon: <MdLeaderboard className="text-xl" />
        }
    ];

    const onSubmit = (e: React.FormEvent) => {
        setIsLoading(true);
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        formData.append('userId', userId);

        if (selectedRole) {
            formData.append('selectedRole', selectedRole);
        }

        updateRole(formData).finally(() => {
            setIsLoading(false);
        })
    };

    return (
        <Form onSubmit={onSubmit} className="w-full">
            <div className="flex flex-col gap-3 w-full">
                {
                    roles.map(role => {
                        return (
                            <Card
                                isPressable
                                className={`w-full ${selectedRole === role.type ? "bg-primary-100 border-primary" : ""}`}
                                key={role.type}
                                onPress={() => setSelectedRole(role.type as Role)}
                            >
                                <CardBody>
                                    <div className="flex flex-row items-center gap-2">
                                        <Avatar
                                            fallback={role.icon}
                                            className={selectedRole === role.type ? "bg-primary text-white" : ""}
                                        />
                                        <div className="flex flex-col">
                                            <h4 className={`font-bold text-large ${selectedRole === role.type ? "text-primary" : ""}`}>
                                                {role.title}
                                            </h4>
                                            <div className="text-sm text-gray-400">{role.description}</div>
                                        </div>
                                    </div>

                                    {selectedRole === role.type && (
                                        <div className="p-4 flex flex-row gap-4">
                                            <CheckboxGroup
                                                color="primary"
                                                label="Congregações"
                                                value={selectedCongregations}
                                                onValueChange={setSelectedCongregations}
                                                name="congregations"
                                            >
                                                {congregations?.map(congregation => (
                                                    <Checkbox key={congregation.id} value={congregation.id}>
                                                        {congregation.name}
                                                    </Checkbox>
                                                ))}
                                            </CheckboxGroup>
                                            <CheckboxGroup
                                                color="primary"
                                                label="Departamentos"
                                                value={selectedDepartments}
                                                onValueChange={setSelectedDepartments}
                                                name="departments"
                                            >
                                                {(departments || []).map(department => (
                                                    <Checkbox key={department.id} value={department.id}>
                                                        {department.name}
                                                    </Checkbox>
                                                ))}
                                            </CheckboxGroup>
                                        </div>
                                    )}
                                </CardBody>
                            </Card>
                        );
                    })
                }
            </div>
            <div className="flex w-full pb-4 justify-end">
                <Button isLoading={isLoading} type="submit" className="mt-4" color="primary">Salvar</Button>
            </div>
        </Form>
    );
}