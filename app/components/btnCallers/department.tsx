'use client'

import DepartmentForm from "@/app/form/department.form"
import { Button } from "@heroui/button"
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react"

export default function DepartmentCallerBtn() {

    const addModal = useDisclosure()

    return (
        <>
            <Button onPress={addModal.onOpen}>+ departamento</Button>

            <Modal isOpen={addModal.isOpen} onClose={addModal.onClose} size="lg">
                <ModalContent>
                    <ModalHeader>Adicionar Departamento</ModalHeader>
                    <ModalBody>
                        <DepartmentForm onClose={addModal.onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}