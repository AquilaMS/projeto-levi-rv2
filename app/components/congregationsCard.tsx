'use client'

import { Button, Card, CardBody, CardFooter, CardHeader, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react"
import { Congregation } from "../generated/prisma"
import { MdEdit } from "react-icons/md";
import CongregationForm from "../form/congregation";

export function CongregationCard({ congregation }: { congregation: Congregation }) {

    const modal = useDisclosure()

    return (
        <>
            <Card key={congregation.id} className="my-4">
                <CardBody>
                    <CardHeader className="font-bold text-2xl flex flex-row justify-between items-center">
                        <p>
                            {congregation.name}
                        </p>
                        <Button onPress={modal.onOpen}><MdEdit /></Button>
                    </CardHeader>
                </CardBody>
            </Card>

            <Modal isOpen={modal.isOpen} onClose={modal.onClose} size="lg">
                <ModalContent>
                    <ModalHeader>Editar congregação</ModalHeader>
                    <ModalBody>
                        <CongregationForm congregation={congregation} />
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    )
}