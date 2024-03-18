<script setup>
    import { inject } from 'vue'
    import { reset } from '@formkit/core'
    import AuthAPI from '../../api/AuthAPI'
    import emailjs from '@emailjs/browser'

    const toast = inject('toast')

    const handleSubmit = async ({email}) => {
        try {
            const { data } = await AuthAPI.forgotPassword({email})
            const templateParams = {
                email: data.email,
                url: `${data.url}/auth/olvide-password/${data.token}`,
                caso: 'Confirmar cuenta', 
                message: `Hola: ${data.name}, has solicitado reestablecer tu password en PetProtector\n
                Sigue el enlace para generar un nuevo password.\n
                Si tu no solicitaste esto, puedes ignorar este mensaje`
            };
            emailjs.send('contact_service', 'verificar_recuperar', templateParams, {
                publicKey: 'B0wqVRi_8q8NKoqc1',
            })
            .then(
            () => {
                console.log('SUCCESS!');
                toast.open({
                    message: 'Revisa tu email',
                    type: 'success'
                })
                },
                (error) => {
                console.log('FAILED...', error.text);
                toast.open({
                    message: 'Error con la solicitud',
                    type: 'danger'
                })
                },
            )
            toast.open({
                message: data.msg,
                type: 'success'
            })
           reset('forgotPassword')
        } catch (error) {
           toast.open({
                message: error.response.data.msg,
                type: 'error'
           })
        }
    }
</script>

<template>
    <div>
        <h1 class="text-6xl font-extrabold text-blue-800 text-center mt-10">Olvide mi password</h1>
        <p class="text-2xl  text-blue-500 text-center my-5">Recupera el acceso a tu cuenta</p>

        <FormKit
            id="forgotPassword"
            type="form"
            :actions="false"
            incomplete-message="No se pudo enviar, revisa las notificaciones"
            @submit="handleSubmit"
        >
            <FormKit
                type="email"
                label="Email"
                name="email"
                placeholder="Email de Usuario"
                validation="required|email"
                :validation-messages="{
                    required: 'El Email es obligatorio',
                    email: 'Email no válido'
                }"
            />

            <FormKit type="submit">Enviar Instrucciones</FormKit>

        </FormKit>
    </div>
</template>

