'use client'

import { Button, Card, CardBody, CardHeader, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react"
import { Department } from "../generated/prisma"
import { MdEdit } from "react-icons/md"
import DepartmentForm from "../form/department.form"

export default function DepartmentCard({ department }: { department: Department }) {
    
    const modal = useDisclosure()
    
    return (
        <>
            <Card key={department.id} className="my-4">
                <CardBody>
                    <CardHeader className="font-bold text-2xl flex flex-row justify-between items-center">
                        <p>
                            {department.name}
                        </p>
                        <Button onPress={modal.onOpen}><MdEdit /></Button>
                    </CardHeader>
                </CardBody>
            </Card>

            <Modal isOpen={modal.isOpen} onClose={modal.onClose} size="lg">
                <ModalContent>
                    <ModalHeader>Editar congregação</ModalHeader>
                    <ModalBody>
                        <DepartmentForm department={department} onClose={modal.onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}