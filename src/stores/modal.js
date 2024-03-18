import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// import { useFavoritosStore } from './favoritos'
// import { useBebidasStore } from './bebidas'

export const useModalStore = defineStore('modal', () => {

    // const favoritos = useFavoritosStore();
    // const bebidas = useBebidasStore();
    const modal = ref(false)
    const adminmodal = ref(false)
    const adminmodaledit = ref(false)
    const texto = ref('hidden')
    const adoptar = ref('hidden')
    function handleClickModal() {
        // se convierte a lo contrario de lo que es
        modal.value = !modal.value
        
        if(adoptar.value !== 'hidden'){
            handleClickAdoptar()
        }
    }

    function adminhandleClickModal() {
        // se convierte a lo contrario de lo que es
        adminmodal.value = !adminmodal.value
    }

    function adminhandleClickModalEdit() {
        // se convierte a lo contrario de lo que es
        adminmodaledit.value = !adminmodaledit.value
    }

    function handleClickTexto() {
        // se convierte a lo contrario de lo que es
        if(texto.value === 'hidden'){
            return texto.value = ''
        }
        texto.value = 'hidden'
    }
    function handleClickAdoptar() {
        // se convierte a lo contrario de lo que es
        if(adoptar.value === 'hidden'){
            return adoptar.value = ''
        }
        adoptar.value = 'hidden'
    }

    // const textoBoton = computed(() => {
    //     return favoritos.existeFavorito(bebidas.receta.idDrink) ? 'Eliminar de Favoritos' : 'Agregar  a Favoritos'
    // })

    return {
        modal,
        handleClickModal,
        handleClickTexto,
        texto,
        adoptar,
        handleClickAdoptar,
        adminhandleClickModal,
        adminhandleClickModalEdit,
        adminmodal,
        adminmodaledit
        // textoBoton
    }
})