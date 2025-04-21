'use client'

import { Button, Card, CardBody, CardHeader, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react"
import { MdEdit } from "react-icons/md"
import { AllowedUser, Congregation, Department, Permission, Role, User } from "../generated/prisma"
import RolesForm from "../form/roles.form"

export default function PermissionsCard({ permission, congregations, departments }: { permission: any, congregations?: Congregation[], departments?: Department[]}) {

    const modal = useDisclosure()

    return (
        <>
            <Card key={permission.id} className="my-4">
                <CardBody>
                    <CardHeader className="font-bold text-2xl flex flex-row justify-between items-center">
                        <p>
                            {permission.name}
                        </p>
                        <Button onPress={modal.onOpen}><MdEdit /></Button>
                    </CardHeader>
                </CardBody>
            </Card>

            <Modal isOpen={modal.isOpen} onClose={modal.onClose} size="3xl">
                <ModalContent>
                    <ModalHeader>Editar permissão</ModalHeader>
                    <ModalBody>
                        <RolesForm userId={permission.userId} permissions={permission.permissions} congregations={congregations} departments={departments} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}