<script setup>
    import { usePets } from '../stores/pets'
    import { useRouter} from 'vue-router'
    import { RouterLink} from 'vue-router'

    const router = useRouter()

    const pets = usePets()

    defineProps({
        pet: {
            type: Object
        }
    })
</script>

<template>
    <div>
        <div class="border shadow-lg">
            <div> 
                <p :class="pet.adopcion==='Si' ? 'visible'  :  'invisible'" class=" p-1 m-1 float-left bg-indigo-400 rounded-full text-white text-xs ">Adopción</p>
                <p :class="pet.acogida==='Si' ? 'visible'  :  'invisible'" class=" p-1 m-1 float-right bg-indigo-400 rounded-full text-white text-xs ">Acogida</p>
            </div>
            <div>
                <b class="text-2xl text-blue-500" >{{ pet.nombre }}</b>
            </div> 
            <div class="flex justify-center overflow-hidden">
                <img 
                    class="w-40 hover:scale-125 transition-transform hover:rotate-2"
                    :src="pet.imagen"
                    alt="Nueva imagen mascota"
                />
            </div>

            <div class="mt-5 sm:mt-6 flex justify-between gap-4 p-5">
                <button
                    type="button"
                    class="bg-blue-400 hover:bg-blue-500 mt-5 w-full p-3 font-bold text-white text-lg rounded-xl"
                    @click="pets.seleccionarPet(pet._id, 'admin')"
                >
                    Ver
                </button>
                <button
                    type="button"
                    class="bg-yellow-500 hover:bg-yellow-600 mt-5 w-full p-3 font-bold text-white text-lg rounded-xl"
                    @click="pets.editPet(pet._id)"
                >
                    Editar
                </button>
                <!-- <RouterLink
                    :to="{name: 'editpet', params: { id : pet._id } }"
                    class="bg-yellow-500 hover:bg-yellow-600 mt-5 w-full p-3 font-bold text-white text-lg rounded-xl"
                >
                Editar
                </RouterLink> -->
                <button
                    type="button"
                    class="bg-red-400 hover:bg-red-500 mt-5 w-full p-3 font-bold text-white text-lg rounded-xl"
                    @click="pets.deletePet(pet._id)"
                >
                    Eliminar
                </button>
            </div>
        </div>
    </div>
</template>   




<!-- @click="#" -->
    <!-- <div
        class="p-5 space-y-5 rounded-lg cursor-pointer"
    >
        <p class="text-2xl font-light">{{ pet.nombre }}</p>
        <p 
            class="text-4xl font-black"
        >{{  pet.raza }}</p>
    </div> -->
                    <!-- :alt="'Imagen de ' + receta.strDrink" -->