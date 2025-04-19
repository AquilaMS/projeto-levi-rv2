'use client'

import CongregationForm from "@/app/form/congregation"
import { Button } from "@heroui/button"
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react"

export default function CongregationCallerBtn() {

    const modal = useDisclosure()

    return (
        <>
            <Button onPress={modal.onOpen}>+ congregação</Button>
            <Modal isOpen={modal.isOpen} onClose={modal.onClose} size="lg">
                <ModalContent>
                    <ModalHeader>Adicionar Congregação</ModalHeader>
                    <ModalBody>
                        <CongregationForm />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}