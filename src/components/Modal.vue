<script setup>
    import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

    import { useModalStore } from '../stores/modal'
    import { usePets } from '../stores/pets'
    import { inject } from 'vue'
    import emailjs from '@emailjs/browser';
    // import { ref, onMounted } from 'vue'
   
    const toast = inject('toast')
    // import { useFavoritosStore } from '../stores/favoritos'
    
    // import { router } from '../router/index'
    // const route = router()

    const modal = useModalStore()
    const pet = usePets()
    // const favoritos = useFavoritosStore()

    const handleSubmit = async (datos) => {
      // var message='Solicitud enviada'
      // var tipo='success'
        // console.log(pet.resulpet)
      var email = ''
      for (var i = 0; i < pet.resulemails.length; i++){
        email = email + ', ' + pet.resulemails[i].email
      }

      const templateParams = {
        email: email,
        caso: datos.caso,
        message: `Nombre: ${datos.name}\nEmail: ${datos.email}\nRazón de la ${datos.caso}: ${datos.texto}`
      };
      // console.log(templateParams)
      // return
      emailjs.send('contact_service', 'adopcion_acogida', templateParams, {
            publicKey: 'B0wqVRi_8q8NKoqc1',
          })
          .then(
            () => {
              console.log('SUCCESS!');
              toast.open({
                  message: 'Solicitud enviada',
                  type: 'success'
              })
            },
            (error) => {
              console.log('FAILED...', error.text);

              toast.open({
                  message: 'Error con la solicitud',
                  type: 'error'
              })
              return
              
            },
          );
      // }
      // toast.open({
      //   message: message,
      //   type: tipo
      // })
      modal.handleClickModal()
    }
</script>

<template>
    <TransitionRoot as="template" :show="modal.modal" >
      <Dialog as="div" class="relative z-10" @close="modal.handleClickModal()">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                <div>
                  <div class="flex justify-center overflow-hidden">
                      <img 
                          class="w-60 hover:scale-125 transition-transform hover:rotate-2"
                          :src="pet.resulpet.imagen"
                          alt="Nueva imagen mascota"
                      />
                  </div>
                        <!-- :alt="'Imagen de ' + bebidas.receta.strDrink" -->
                  <div class="mt-3">
                    <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">
                            {{ pet.resulpet.nombre }}
                    </DialogTitle>
                    <div v-if="modal.adoptar === 'hidden'">
                      <!-- <div v-html="formatearIngredientes().outerHTML"></div> -->
                      <div>
                        <p class="text-lg text-gray-500">Sexo: <b class="text-lg text-blue-600">{{ pet.resulpet.sexo }} </b></p>
                      </div>
                      <div>
                        <p class="text-lg text-gray-500">Tamaño: <b class="text-lg text-blue-600">{{ pet.resulpet.tamaño }} </b></p>
                      </div>
                      <div >
                        <p class="text-lg text-gray-500">F. Nacimiento: <b class="text-lg text-blue-600">{{ pet.resulpet.fechanacimiento }} </b></p>
                      </div>
                      <div>
                        <p class="text-lg text-gray-500">Esterilizado: <b class="text-lg text-blue-600">{{ pet.resulpet.esterilizado }}</b></p>
                      </div>
                      <div >
                        <p class="text-lg text-gray-500">Chip: <b class="text-lg text-blue-600">{{ pet.resulpet.chip }}</b></p>
                      </div>
                      <div v-if="pet.resulpet.descripcion">
                        <p class="text-lg text-gray-500">Descripcion: 
                          <a v-if="modal.texto==='hidden'"
                            @click="modal.handleClickTexto()"
                            class="text-lg text-blue-600 cursor-pointer">Mostar...
                          </a>
                          <b
                            :class="modal.texto"
                            class="text-lg text-gray-600">{{ pet.resulpet.descripcion }} 
                          </b>
                          <a 
                            :class="modal.texto"
                            @click="modal.handleClickTexto()"
                            class="text-lg text-blue-600 cursor-pointer"> ...Ocultar
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div :class="modal.adoptar">
                  <FormKit
                      id="adopForm"
                      type="form"
                      :actions="false"
                      incomplete-message="No se pudo enviar, revisa las notificaciones"
                      @submit="handleSubmit"
                  >
                  <FormKit
                    type="text"
                    label="Nombre"
                    name="name"
                    placeholder="Tu Nombre"
                    validation="required|length:3"
                    :validation-messages="{
                        required: 'El Nombre es obligatorio',
                        length: 'El nombre es muy corto'
                    }"
                  />
                  <FormKit
                      type="email"
                      label="Email"
                      name="email"
                      placeholder="Email de Registro"
                      validation="required|email"
                      :validation-messages="{
                          required: 'El Email es obligatorio',
                          email: 'Email no válido'
                      }"
                  />
                  <div v-if="pet.route.name === 'adopcion'">
                      <FormKit
                          type="textarea"
                          label="Por que quieres adoptar?"
                          name="texto"
                          placeholder=""
                          validation="required"
                          :validation-messages="{
                              required: 'No olvides escribir algo'
                          }"
                      />
                  </div>
                  <div v-else>
                      <FormKit
                          type="textarea"
                          label="Por que quieres acoger?"
                          name="message"
                          placeholder=""
                          validation="required"
                          :validation-messages="{
                              required: 'No olvides escribir algo'
                          }"
                      />
                  </div>
                      <FormKit
                        v-if="pet.route.name === 'adopcion'"
                          type="hidden"
                          name="caso"
                          value="adopcion"
                      />
                      <FormKit
                        v-else
                          type="hidden"
                          name="caso"
                          value="acogida"
                      />
                      <FormKit type="submit">Solicitar <span v-if="pet.route.name === 'adopcion'">Adopción</span><span v-else>Acogida</span> </FormKit>
                  </FormKit>
                </div>
                <div class="mt-5 sm:mt-6 flex justify-between gap-4">
                  <button
                        type="button"
                        class="w-full rounded bg-red-600 p-3 font-bold uppercase text-white shadow hover:bg-red-500"
                        @click="modal.handleClickModal()"
                    >Cerrar</button>
                  <button v-if="modal.adoptar === 'hidden' && pet.route.name !== 'mascota'"
                        type="button"
                        class="text-center w-full rounded bg-green-600 p-3 font-bold uppercase text-white shadow hover:bg-green-500"
                        @click="modal.handleClickAdoptar()"
                    ><span v-if="pet.route.name === 'adopcion'">Adoptar</span><span v-else>Acoger</span></button>
                  <button v-else-if="pet.route.name !== 'mascota'"
                        type="button"
                        class="text-center w-full rounded bg-yellow-600 p-3 font-bold uppercase text-white shadow hover:bg-yellow-500"
                        @click="modal.handleClickAdoptar()"
                    >Cancelar</button>
                </div> 
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
</template>