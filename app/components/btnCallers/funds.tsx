'use client'

import FundForm from "@/app/form/fund.form"
import { Congregation, Department } from "@/app/generated/prisma"
import { Button } from "@heroui/button"
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react"

export default function FundsCallerBtn({ departments, congregations }: { departments?: Department[], congregations?: Congregation[] }) {

    const addModal = useDisclosure()

    return (
        <>
            <Button onPress={addModal.onOpen}>+ fundo</Button>

            <Modal isOpen={addModal.isOpen} onClose={addModal.onClose} size="lg">
                <ModalContent>
                    <ModalHeader>Adicionar Fundo</ModalHeader>
                    <ModalBody>
                        <FundForm onClose={addModal.onClose} departments={departments} congregations={congregations}  />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}