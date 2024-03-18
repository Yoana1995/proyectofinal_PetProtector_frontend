<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    // import Modal from '../../components/adminModal.vue'
    import { useRoute } from 'vue-router'
    // import adminModal from '../../components/adminModal.vue'
    import Logo from '../../components/Logo.vue';
    import { useUserStore } from '@/stores/user';

    const user = useUserStore()
    const route = useRoute()  

</script>

<template>
    <div>
        <header class=" px-10 py-5 bg-blue-400 flex justify-between absolute items-stretch top-0 w-full z-10">
            <RouterLink :to="{name: 'admin' }">
                <Logo/>
            </RouterLink>
            <div>
            <nav class="self-center">
                <RouterLink
                    :to="{name: 'mascotas' }"
                    class="rounded font-bold p-2"
                    :class="route.name === 'mascotas' ? 'text-blue-900'  :  ' text-white'"
                >
                    Todas
                </RouterLink>
                <RouterLink
                    :to="{name: 'adopciones' }"
                    class="rounded font-bold p-2"
                    :class="route.name === 'adopciones' ? 'text-blue-900'  :  ' text-white'"
                >
                    Adopciones
                </RouterLink>
                <RouterLink
                    :to="{name: 'acogidas'}"
                    class="rounded  font-bold p-2"
                    :class="route.name === 'acogidas' ? 'text-blue-900'  :  ' text-white'"
                >
                    Acogidas
                </RouterLink>
            </nav>
            </div>
            <div class="self-center">
            <button
                @click="user.logout"
                class="text-blue-800 border border-blue-800 px-10 py-3 rounded-full duration-300 hover:bg-blue-600 hover:text-white"
            >
                CerrarSesion           
            </button>
            </div>
        </header> 
        
        <div class="container">
            <div class="flex justify-between">
                <div class="w-full text-center">
                    <div class="flex justify-between">
                        <div>
                            <RouterLink
                                    :to="{name: 'register'}"
                                    class="text-blue-800 border border-blue-800 px-10 py-3 rounded-xl duration-300 hover:bg-blue-600 hover:text-white"
                            >
                                + Admin
                            </RouterLink>
                        </div>
                        <div>
                        <RouterLink
                                :to="{name: 'registerpet'}"
                                class="text-blue-800 border border-blue-800 px-10 py-3 rounded-xl duration-300 hover:bg-blue-600 hover:text-white"
                        >
                            + Mascota
                        </RouterLink>
                        </div>
                    </div>
                    <div v-if="route.name === 'admin'" class="w-full text-center p-10">
                        <div class=" rounded-full p-12 mb-20 bg-blue-400">
                            <h1 class="font-black text-white text-2xl">Bienvenid@ a</h1>
                            <Logo/>
                            <h1 class="font-black text-white text-2xl">{{ user.getUserName }}</h1>
                        </div>
                    </div>
                    <main>
                        <RouterView/>
                    </main>
                </div>
            </div>
        </div>
    </div>
</template>