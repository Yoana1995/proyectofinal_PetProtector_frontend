<script setup>
    import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

    import { useModalStore } from '../stores/modal'
    import { usePets } from '../stores/pets'
    import { inject } from 'vue'
    import useImage from '../composables/useImage'
    import { push } from 'firebase/database'
    // import { PetsAPI } from '../api/PetsAPI.js'
    // import { useRoute, useRouter} from 'vue-router'

    const { url, onFileChange, isImageUploaded } = useImage()
    const toast = inject('toast')
    // import { useFavoritosStore } from '../stores/favoritos'
    
    // import { router } from '../router/index'
    // const route = router()

    const modal = useModalStore()
    const pet = usePets()
    // const favoritos = useFavoritosStore()

    const handleSubmit = async (formData) => {  
        const { image, ...values } = formData

        const imagen = { imagen: url.value }
        const Data = Object.assign(values, imagen);
        // console.log(Data)
        try {
            
            const { data } = await await pet.editarPet(pet.resulpet._id,Data)

            // toast.open({
            //     message: data.msg,
            //     type: 'success'
            // })
            // reset('editPetForm')
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        } 
    }

    const date = new Date();          
    const formatear = date.getFullYear() + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2)       
    const formatea = 'required|date_before:'+formatear

</script>

<template>
    <TransitionRoot as="template" :show="modal.adminmodaledit" >
      <Dialog as="div" class="relative z-10" @close="modal.adminhandleClickModalEdit()">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                <div v-if="isImageUploaded" class="flex justify-center overflow-hidden">
                    <img 
                        class="w-60 hover:scale-125 transition-transform hover:rotate-2"
                        :src="url"
                        alt="Nueva imagen mascota"
                    />
                </div>
                <div v-else class="flex justify-center overflow-hidden">
                    <img 
                        class="w-60 hover:scale-125 transition-transform hover:rotate-2"
                        :src="pet.resulpet.imagen"
                        alt="Nueva imagen mascota"
                    />
                </div>
                <FormKit
                    id="editPetForm"
                    type="form"
                    :actions="false"
                    incomplete-message="No se pudo enviar, revisa las notificaciones"
                    @submit="handleSubmit"
                >
                    <FormKit
                        type="file"
                        label="Imagen Mascota"
                        name="image"
                        accept=".jpg, .jpeg"
                        @change="onFileChange"
                        v-model.trim="pet.resulpet.image"
                    />
                    <FormKit
                        type="text"
                        label="Nombre"
                        name="nombre"
                        :value="pet.resulpet.nombre"
                        placeholder="Nombre de la mascota"
                        validation="required|length:3"
                        :validation-messages="{
                            required: 'El Nombre es obligatorio',
                            length: 'El nombre es muy corto'
                        }"
                    />
                    <FormKit
                        type="select"
                        label="Sexo"
                        :value="pet.resulpet.sexo"
                        placeholder="Sexo de la mascota"
                        name="sexo"
                        :options="{
                            Hembra: 'Hembra',
                            Macho: 'Macho'
                        }"
                        validation="required|sexo"
                        :validation-messages="{
                            required: 'Debe elegir una opción',
                        }"
                    />
                    <FormKit
                        type="select"
                        label="Esterilizado"
                        :value="pet.resulpet.esterilizado"
                        placeholder="Esta esterilizado?"
                        name="esterilizado"
                        :options="{
                            Si: 'Si',
                            No: 'No'
                        }"
                        validation="required|sexo"
                        :validation-messages="{
                            required: 'Debe elegir una opción',
                        }"
                    />
                    <FormKit
                        type="select"
                        label="Tamaño"
                        :value="pet.resulpet.tamaño"
                        placeholder="Tamaño de la mascota"
                        name="tamaño"
                        :options="{
                            Pequeño: 'Pequeño',
                            Mediano: 'Mediano',
                            Grande: 'Grande'
                        }"
                        validation="required|sexo"
                        :validation-messages="{
                            required: 'Debe elegir una opción',
                        }"
                    />
                    <FormKit
                        type="date"
                        label="Fecha de nacimiento"
                        :value="pet.resulpet.fechanacimiento"
                        name="fechanacimiento"
                        :validation="formatea"
                        :validation-messages="{
                            required: 'La fecha es obligatoria',
                            date_before: 'Fecha invalida',
                        }"
                    />
                    <FormKit
                        type="select"
                        label="Chip"
                        :value="pet.resulpet.chip"
                        placeholder="Tiene chip?"
                        name="chip"
                        :options="{
                            Si: 'Si',
                            No: 'No'
                        }"
                        validation="required|sexo"
                        :validation-messages="{
                            required: 'Debe elegir una opción',
                        }"
                    />
                    <FormKit
                        type="select"
                        label="Especie"
                        :value="pet.resulpet.especie"
                        placeholder="Qué especie es?"
                        name="especie"
                        :options="{
                            gato: 'Gato',
                            perro: 'Perro',
                            ave: 'Ave',
                            conejo: 'Conejo',
                            reptil: 'Reptil',
                            roedor: 'Roedor',
                            otros: 'Otros'
                        }"
                        validation="required|especie"
                        :validation-messages="{
                            required: 'Debe elegir una opción',
                        }"
                    />
                    <FormKit
                        type="select"
                        label="En adopción"
                        :value="pet.resulpet.adopcion"
                        placeholder="Esta en adopción?"
                        name="adopcion"
                        :options="{
                            Si: 'Si',
                            No: 'No'
                        }"
                        validation="required|adop"
                        :validation-messages="{
                            required: 'Debe elegir una opción',
                        }"
                    />
                    <FormKit
                        type="select"
                        label="En acogida"
                        :value="pet.resulpet.acogida"
                        placeholder="Esta en acogida?"
                        name="acogida"
                        :options="{
                            Si: 'Si',
                            No: 'No'
                        }"
                        validation="required|acog"
                        :validation-messages="{
                            required: 'Debe elegir una opción',
                        }"
                    /> 
                    <FormKit
                        type="textarea"
                        label="Descripción"
                        name="descripcion"
                        :value="pet.resulpet.descripcion"
                        placeholder="Descripcion de la mascota"
                        validation="required"
                        :validation-messages="{
                            required: 'Debe escribir algo'
                        }"
                    />

                    <FormKit type="submit">Editar Mascota</FormKit>
                    </FormKit>
          
                <div class="mt-5 sm:mt-6 flex justify-between gap-4">
                  <button
                        type="button"
                        class="w-full rounded bg-red-600 p-3 font-bold uppercase text-white shadow hover:bg-red-500"
                        @click="modal.adminhandleClickModalEdit()"
                    >Cerrar</button>
                </div> 
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
</template>