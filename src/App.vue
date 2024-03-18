<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import Modal from './components/Modal.vue'
  import adminModal from './components/adminModal.vue'
  import adminModalEdit from './components/adminModalEdit.vue'
  import { useRoute} from 'vue-router'

  import Logo from './components/Logo.vue';
  
    // const token = localStorage.getItem('AUTH_TOKEN')
    // console.log(token)
  

  const route = useRoute()
  
</script>

<template>
  <div>
    <!-- <div class="container">
      <div class="flex justify-between">
        <div class="w-full text-center">
          <RouterView />
        </div>
      </div>
    </div> -->
    
          <RouterView />
          <Modal/>
          <adminModal/>
          <adminModalEdit/>

      </div>

  
</template>
