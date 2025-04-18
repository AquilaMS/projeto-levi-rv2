'use server'

export async function sendForgotPassword(formData: FormData) {
    const email = formData.get('email') as string;
    try {
        
    } catch (error) {
        throw new Error(error as any);
    }
}