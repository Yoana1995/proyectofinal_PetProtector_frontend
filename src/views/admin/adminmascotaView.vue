<script setup>
    import { inject } from 'vue'
    import { reset } from '@formkit/vue'
    import PetsAPI from '../../api/PetsAPI'
    // import emailjs from '@emailjs/browser'
    import useImage from '../../composables/useImage'
    import { push } from 'firebase/database'

    const { url, onFileChange, isImageUploaded } = useImage()

    const toast = inject('toast')
    // // const template= '<template><h1>hola</h1></template>'
    const handleSubmit = async (formData) => {    
            // console.log(formData)
        const { image, ...values } = formData

        const imagen = { imagen: url.value }
        const Data = Object.assign(values, imagen);
        
        // console.log(Data)

        try {
            const { data } = await PetsAPI.registerPet(Data)

            toast.open({
                message: data.msg,
                type: 'success'
            })
            setTimeout(() => {
                location.reload()
            },2000)
            reset('editPetForm')
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
    <div class="mx-auto lg:w-2/5 mt-20">
        <h1 class="text-6xl font-extrabold text-blue-800 text-center mt-10">Añadir mascota</h1>
        <p class="text-2xl text-black-500 text-center my-5">Agrega una nueva mascota</p>
        <div v-if="isImageUploaded" class="flex justify-center overflow-hidden">
            <img 
                class="w-40 hover:scale-125 transition-transform hover:rotate-2"
                :src="url"
                alt="Nueva imagen mascota"
            />
        </div>
        <div v-else class="flex justify-center overflow-hidden">
            <img 
                class="w-40 hover:scale-125 transition-transform hover:rotate-2"
                src="../../../public/huella.jpg"
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
                validation="required"
                :validation-messages="{required: 'La Imagen es Obligatoria'}"
                accept=".jpg, .jpeg"
                @change="onFileChange"
            />
            <FormKit
                type="text"
                label="Nombre"
                name="nombre"
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
                placeholder="Descripcion de la mascota"
                validation="required"
                :validation-messages="{
                    required: 'Debe escribir algo'
                }"
            />

            <FormKit type="submit">Añadir Mascota</FormKit>
        </FormKit>
    </div>
</template>