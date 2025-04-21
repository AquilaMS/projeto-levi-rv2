'use client'

import PermissionForm from "@/app/form/permission.form"
import { Button } from "@heroui/button"
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react"

export default function PermissionCallerBtn() {

    const addModal = useDisclosure()

    return (
        <>
            <Button onPress={addModal.onOpen}>+ permissão</Button>

            <Modal isOpen={addModal.isOpen} onClose={addModal.onClose} size="lg">
                <ModalContent>
                    <ModalHeader>Adicionar Permissão</ModalHeader>
                    <ModalBody>
                          <PermissionForm onClose={addModal.onClose}  />                     
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}