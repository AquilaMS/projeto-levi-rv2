'use client'

import { addToast, Button, Form, Input, Link, ToastProvider } from "@heroui/react";
import { createAccountWithEmail } from "../(auth)/signup/actions";
import { useState } from "react";

export default function SignupForm() {

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        createAccountWithEmail(formData).then(() => {
            addToast({
                title: "Conta criada com sucesso",
                description: 'Verifique seu email para confirmar',
                color: 'success',
                timeout: 5000
            })
        }).catch((err) => {
            addToast({
                title: "Erro ao criar conta",
                description: err.message,
                color: 'danger',
                timeout: 5000
            })
        }).finally(() => {
            setIsLoading(false)
        })
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Input isRequired type="text" label='Nome' name="name"></Input>
            <Input isRequired type="email" label='Email' name="email"></Input>
            <Input isRequired type="password" label='Senha' name="password"></Input>
            <div className="flex flex-row w-full gap-4">
                <Link href="/login">
                    <Button type="button" className="w-full max-w-56" variant="light">já tenho conta</Button>
                </Link>
                <Button isLoading={isLoading} type="submit" className="w-full" color="primary">Criar conta</Button>
            </div>
            <ToastProvider placement='top-center' toastOffset={"top-center".includes("top") ? 60 : 0} />

        </Form>
    )
}