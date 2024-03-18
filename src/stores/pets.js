import { ref, onMounted, computed} from 'vue'
import { defineStore } from 'pinia'
import PetsAPI from '../api/PetsAPI'
import AuthAPI from '../api/AuthAPI'
import { useModalStore } from './modal'
import { useRoute, useRouter} from 'vue-router'
import { inject } from 'vue'
import router from '@/router'

export const usePets = defineStore('pets', () => {

    const modal = useModalStore()
    const resulpets = ref([]) 
    const resulemails = ref([]) 
    const resulpet = ref({})
    const resulpetopcion = ref([])
    const route = useRoute()
    const router = useRouter()
    const toast = inject('toast')
    const Opcion = ref({})

    onMounted(async () => {
        try {
            const { data } = await PetsAPI.all()
            resulpets.value = data.pets
            resulemails.value = data.user
        } catch (error) {
            console.log(error)
        }
    })

    async function seleccionarPet(id, admin) {
        const { data }   = await PetsAPI.buscarPet(id)
        resulpet.value = data
        if(admin === 'admin'){
            modal.adminhandleClickModal()
        }else{
            modal.handleClickModal()
        } 
    }

    async function seleccionarPetOpcion(opcion) {
        if(opcion===Opcion.value){
            const { data } = await PetsAPI.all()
            resulpets.value = data.pets
            resulemails.value = data.user
            Opcion.value = ''
        }else{
            const { data } = await PetsAPI.opcionPet(opcion)
            Opcion.value = opcion
            resulpets.value = data
        }
    }

    async function deletePet(id) {
        if(confirm('¿Deseas eliminar esta mascota?')){
            try {
                const { data } = await PetsAPI.deletePet(id)

                toast.open({
                    message: data.msg,
                    type: 'success'
                })
                location.reload()
                
            } catch (error) {
                toast.open({
                    message: error.response.data.msg,
                    type: 'error'
                })
            }
        }
    }

    async function editPet(id) {
        // console.log(data)
        const { data }   = await PetsAPI.buscarPet(id)
        resulpet.value = data
        modal.adminhandleClickModalEdit()
    }

    async function editarPet(id, datos) {
        try {
            const { data } = await PetsAPI.editPet(id, datos)

            toast.open({
                message: data.msg,
                type: 'success'
            })
            modal.adminhandleClickModalEdit()
            location.reload()
            
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

    async function obtenerEmail(id, datos) {
        console.log('llegueeeeee')
         await AuthAPI.obtenerEmail()
    }

    return {
        resulpets,
        seleccionarPet,
        resulpet,
        seleccionarPetOpcion,
        resulpetopcion,
        deletePet,
        editPet,
        editarPet,
        route,
        Opcion,
        obtenerEmail,
        resulemails
    }
})