'use client'

import { addToast, Button, Form, Input, Link, ToastProvider } from "@heroui/react";
import { loginWithEmail } from "../(auth)/login/actions";
import { useState } from "react";

export default function LoginForm() {

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        loginWithEmail(formData).then(() => {
            addToast({
                title: "Bem vindo(a)",
                color: 'success',
                timeout: 2000
            })
        }).catch((err) => {
            if (err.message == 'Email not confirmed') {
                addToast({
                    title: "Email não confirmado",
                    description: "Por favor, verifique seu email e confirme sua conta",
                    color: 'warning',
                    timeout: 2000
                })
            } else
                addToast({
                    title: "Erro ao entrar",
                    description: "Verifique se seu email e senha estão corretos",
                    color: 'danger',
                    timeout: 2000
                })
        }).finally(() => {
            setIsLoading(false)
        })
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Input label='Email' name="email"></Input>
            <Input label='Senha' name="password"></Input>

            <Link href="/forgot-password">
                <Button type="button" className="w-full max-w-56" variant="light">esqueci minha senha</Button>
            </Link>

            <div className="flex flex-row w-full gap-4">
                <Link href="/signup">
                    <Button type="button" className="w-full max-w-56" variant="light">criar conta</Button>
                </Link>
                <Button type="submit" className="w-full" color="primary">Entrar</Button>
            </div>
            <ToastProvider placement='top-center' toastOffset={"top-center".includes("top") ? 60 : 0} />
        </Form>
    )
}