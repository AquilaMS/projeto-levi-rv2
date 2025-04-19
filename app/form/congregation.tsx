'use client'

import { addToast, Button, Form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import { useEffect, useState } from "react";
import { deleteCongregation, setCongregation } from "../congregation/actions";
import { Congregation } from "../generated/prisma";

export default function CongregationForm({ congregation }: { congregation?: Congregation }) {

    const [isLoading, setIsLoading] = useState(false);
    const confirmDeleteModal = useDisclosure()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setCongregation(data).finally(() => {
            setIsLoading(false)
            addToast({ title: 'Congregação adicionada com sucesso', color: 'success' });
        }).catch((error) => {
            addToast({ title: error.message, color: 'danger' });
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const handleDelete = () => {
        setIsLoading(true)
        confirmDeleteModal.onClose()
        if (!congregation?.id) return
        deleteCongregation(congregation.id).finally(() => {
            setIsLoading(false)
            addToast({ title: 'Congregação excluída com sucesso', color: 'success' });
        }).catch((error) => {
            addToast({ title: error.message, color: 'danger' });
        }).finally(() => {
            setIsLoading(false);
        })
    }

    return (<>
        <Form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-end items-end w-full">
            <Input type="hidden" value={congregation?.id} name="id" />
            <Input type="text" defaultValue={congregation?.name} name="name" label='Nome' required />
            <div className="flex flex-row gap-4 justify-between items-center w-full">
                <Button onPress={confirmDeleteModal.onOpen} color="danger" variant="light">excluir congregação</Button>
                <Button isLoading={isLoading} type="submit">salvar</Button>
            </div>

        </Form>

        <Modal isOpen={confirmDeleteModal.isOpen} onClose={confirmDeleteModal.onClose} size="lg">
            <ModalContent>
                <ModalHeader>Confirmar exclusão</ModalHeader>
                <ModalBody>
                    Tem certeza que deseja excluir esta congregação? Essa ação não pode ser desfeita. Dados prévios dela ainda estaram registrados no banco de dados
                </ModalBody>
                <ModalFooter>
                    <Button variant="light" onPress={confirmDeleteModal.onClose}>Cancelar</Button>
                    <Button color="danger" onPress={handleDelete}>Excluir</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>)
}