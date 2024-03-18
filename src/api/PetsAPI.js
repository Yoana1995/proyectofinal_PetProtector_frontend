import api from "../lib/axios";

export default {
    registerPet(data) {
        return api.post('/pets', data)
    },
    all() {
        return api.get('/pets')
    },
    buscarPet(id) {
        return api.get(`/pets/${id}`)
    },
    opcionPet(opcion) {
        return api.get(`/pets/opcion/${opcion}`)
    },
    deletePet(id) {
        return api.delete(`/pets/${id}`)
    },
    editPet(id,data) {
        return api.put(`/pets/${id}`, data)
    }
}

