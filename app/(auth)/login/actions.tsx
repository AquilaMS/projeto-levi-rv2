'use server'

export async function loginWithEmail(formData: FormData) {

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

}