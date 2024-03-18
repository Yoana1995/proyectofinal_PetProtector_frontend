<script setup>
import { onMounted } from 'vue'
  import Logo from '../../components/Logo.vue'
  import { useRoute} from 'vue-router'
  import { useRouter} from 'vue-router'
  // import Modal from '../../components/Modal.vue'
  // import adminModal from '../../components/adminModal.vue'
  import { RouterLink, RouterView } from 'vue-router'
  
  const route = useRoute()
  const router = useRouter()
  // console.log(route.name)

  onMounted(async () => {
    const token = localStorage.getItem('AUTH_TOKEN')
    
    if(token){
      router.push({name : 'admin'})
    }
  })

  
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
                  :to="{name: 'mascota' }"
                  class="rounded font-bold p-2"
                  :class="route.name === 'mascota' ? 'text-blue-900'  :  ' text-white'"
              >
                  Ver todo
              </RouterLink>
              <RouterLink
                  :to="{name: 'adopcion' }"
                  class="rounded font-bold p-2"
                  :class="route.name === 'adopcion' ? 'text-blue-900'  :  ' text-white'"
              >
                  Adopción
              </RouterLink>
              <RouterLink
                  :to="{name: 'acogida'}"
                  class="rounded  font-bold p-2"
                  :class="route.name === 'acogida' ? 'text-blue-900'  :  ' text-white'"
              >
                  Acogida
              </RouterLink>
          </nav>
        </div>
        <div class="self-center">
          <RouterLink
            :to="{name: 'login'}"
            class="text-blue-800 border border-blue-800 px-10 py-3 rounded-full duration-300 hover:bg-blue-600 hover:text-white"
          >
            IniciarSesion
          </RouterLink>
        </div>
    </header>
    <div class="flex justify-between">
      <div class="w-full text-center px-10">
        
        <div v-if="route.name === 'home'" class=" rounded-full p-12 mb-20 bg-blue-400">
            <h1 class="font-black text-white text-2xl">Bienvenidos a</h1>
            <Logo/>
        </div>
        
        <div>
            <main>
                <RouterView/>
            </main>
        </div>

        <Modal/>
        <adminModal/>
      </div>
    </div>
  </div>
</template>