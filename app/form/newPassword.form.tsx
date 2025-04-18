'use client'

import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { addToast, Form, ToastProvider } from "@heroui/react"
import { resetPassword } from "../(auth)/new-password/actions"
import { useState } from "react"

export default function NewPasswordForm() {

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        if (formData.get('password') !== formData.get('confirmNewPassword')) {
            addToast({
                title: "Erro ao alterar senha",
                description: "As senhas não coincidem",
                color: 'danger',
                timeout: 4000
            })
        } else {
            resetPassword(formData).then(() => {
                addToast({
                    title: "Senha alterada",
                    description: "Sua senha foi alterada com sucesso",
                    color: 'success',
                    timeout: 4000
                })
            }).catch((err) => {
                addToast({
                    title: "Erro ao alterar senha",
                    description: err.message,
                    color: 'danger',
                    timeout: 4000
                })
            }).finally(() => {
                setIsLoading(false)
            })
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Input label='Nova senha' name="password"></Input>
            <Input label='Confirme a nova senha' name="confirmNewPassword"></Input>

            <Button isLoading={isLoading} type="submit" className="w-full " color="primary">Enviar</Button>
            <ToastProvider placement='top-center' toastOffset={"top-center".includes("top") ? 60 : 0} />
        </Form>
    )
}