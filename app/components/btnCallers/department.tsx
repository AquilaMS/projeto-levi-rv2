'use client'

import { getCongregations } from "@/app/congregation/actions"
import DepartmentForm from "@/app/form/department.form"
import { Congregation } from "@/app/generated/prisma"
import { Button } from "@heroui/button"
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react"

import { useEffect, useState } from "react"

export default function DepartmentCallerBtn() {

    const addModal = useDisclosure()
    const [congregations, setCongregations] = useState<Congregation[]>([])

    useEffect(() => {
        getCongregations().then((congs) => {
            setCongregations(congs)
        })
    }, [])

    return (
        <>
            <Button onPress={addModal.onOpen}>+ departamento</Button>

            <Modal isOpen={addModal.isOpen} onClose={addModal.onClose} size="lg">
                <ModalContent>
                    <ModalHeader>Adicionar Departamento</ModalHeader>
                    <ModalBody>
                        <DepartmentForm onClose={addModal.onClose} congregations={congregations} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}