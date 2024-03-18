<script setup>
    import { usePets } from '../stores/pets'

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
            <div class="flex justify-center overflow-hidden">
                <img 
                    class="w-40 hover:scale-125 transition-transform hover:rotate-2"
                    :src="pet.imagen"
                    alt="Nueva imagen mascota"
                />
            </div>

            <div class="p-5">
                <button
                    type="button"
                    class="bg-blue-400 hover:bg-blue-500 mt-5 w-full p-3 font-bold text-white text-lg rounded-xl"
                    @click="pets.seleccionarPet(pet._id)"
                >
                    Ver a {{ pet.nombre }}
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