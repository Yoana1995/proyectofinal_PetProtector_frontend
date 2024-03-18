<script setup>
    import { inject } from 'vue'
    import { useRouter } from 'vue-router'
    import AuthAPI from '../../api/AuthAPI';

    const toast = inject('toast')
    const router = useRouter()

    const handleSubmit = async (formData) => {
        try {
            const { data: { token } } = await AuthAPI.login(formData)
            // console.log(token)
            localStorage.setItem('AUTH_TOKEN', token)
            router.push({name: 'admin'})
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
        <h1 class="text-6xl font-extrabold text-blue-800 text-center mt-10">Iniciar Sesión</h1>
        <p class="text-2xl text-blue-500 text-center my-5">Si tienes una cuenta, inicia sesión</p>

        <FormKit
            id="loginForm"
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

            <FormKit
                type="password"
                label="Password"
                name="password"
                placeholder="Password de Usuario"
                validation="required"
                :validation-messages="{
                    required: 'El Password es obligatorio'
                }"
            />

            <FormKit type="submit">Iniciar Sesión</FormKit>
        </FormKit>
    </div>
</template>
