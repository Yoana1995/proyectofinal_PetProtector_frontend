<script setup>
    import PetsItem from '../../components/PetsItem.vue'
    import {usePets} from '../../stores/pets'
    const pets = usePets()
</script>


<template>
    <div>
        <div class="flex justify-center m-2">
            <div>
                <img 
                    :class="pets.Opcion==='gato' ? 'bg-red-300'  :  ''"
                    class="cursor-pointer w-20 m-1 rounded-full border-2 border-black active:bg-red-300 hover:bg-red-500"
                    src="../../../public/gato.ico"
                    title="Gato"
                    @click="pets.seleccionarPetOpcion('gato')"
                />
            </div>
            <div>
                <img 
                    :class="pets.Opcion==='perro' ? 'bg-sky-300'  :  ''"
                    class="cursor-pointer w-20 m-1 rounded-full border-2 border-black active:bg-sky-300 hover:bg-sky-500"
                    src="../../../public/perro.ico"
                    title="Perro"
                    @click="pets.seleccionarPetOpcion('perro')"
                />
            </div>
            <div>
                <img 
                    :class="pets.Opcion==='ave' ? 'bg-yellow-300'  :  ''"
                    class="cursor-pointer w-20 m-1 rounded-full border-2 border-black active:bg-yellow-300 hover:bg-yellow-500"
                    src="../../../public/ave.ico"
                    title="Ave"
                    @click="pets.seleccionarPetOpcion('ave')"
                />
            </div>
            <div>
                <img 
                    :class="pets.Opcion==='conejo' ? 'bg-orange-300'  :  ''"
                    class="cursor-pointer w-20 m-1 rounded-full border-2 border-black active:bg-orange-300 hover:bg-orange-500"
                    src="../../../public/conejo.ico"
                    title="Conejo"
                    @click="pets.seleccionarPetOpcion('conejo')"
                />
            </div>
            <div>
                <img 
                    :class="pets.Opcion==='reptil' ? 'bg-green-300'  :  ''"
                    class="cursor-pointer w-20 m-1 rounded-full border-2 border-black active:bg-green-300 hover:bg-green-500"
                    src="../../../public/reptil.ico"
                    title="Reptil"
                    @click="pets.seleccionarPetOpcion('reptil')"
                />
            </div>
            <div>
                <img 
                    :class="pets.Opcion==='roedor' ? 'bg-amber-700'  :  ''"
                    class="cursor-pointer w-20 m-1 rounded-full border-2 border-black active:bg-amber-700 hover:bg-amber-800"
                    src="../../../public/roedor.ico"
                    title="Roedor"
                    @click="pets.seleccionarPetOpcion('roedor')"
                />
            </div>
            <div>
                <img 
                    :class="pets.Opcion==='otros' ? 'bg-pink-300'  :  ''"
                    class="cursor-pointer w-20 m-1 rounded-full border-2 border-black active:bg-pink-300 hover:bg-pink-500"
                    src="../../../public/otros.ico"
                    title="Otros"
                    @click="pets.seleccionarPetOpcion('otros')"
                />
            </div>
        </div>
        <h2 class="text-4xl font-extrabold text-blue-700">Mascotas</h2>
        <br>
        <h2
            v-if="pets.resulpets.length===0"
        >
            No hay mascotas en la base de datos
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mt-5">
            <template v-for="pet in pets.resulpets">
                <PetsItem
                    v-if="pet.acogida==='Si' || pet.adopcion==='Si' "
                    :key="pet._id"
                    :pet="pet"
                />
            </template>
        </div>
    </div>
</template>