'use client'

import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { addToast, Form, ToastProvider } from "@heroui/react"
import Link from "next/link"
import { sendForgotPassword } from "../(auth)/forgot-password/actions"
import { useState } from "react"

export default function ForgotPasswordForm() {

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setIsLoading(true)
        sendForgotPassword(formData).then(() => {
            addToast({
                title: "Email enviado",
                description: "Verifique seu email para redefinir sua senha",
                color: 'success',
                timeout: 4000
            })
        }).catch((err) => {
            addToast({
                title: "Erro ao enviar email",
                description: err.message,
                color: 'danger',
                timeout: 4000
            })
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Input label='Email' name="email"></Input>

            <div className="flex flex-row w-full gap-4">
                <Link href="/login" className="w-full max-w-56">
                    <Button type="button" className="w-full" variant="light">Entrar</Button>
                </Link>
                <Button isLoading={isLoading} type="submit" className="w-full " color="primary">Enviar email</Button>
            </div>
            <ToastProvider placement='top-center' toastOffset={"top-center".includes("top") ? 60 : 0} />
        </Form>
    )
}