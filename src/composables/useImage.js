import { ref, computed } from 'vue'
import { uid } from 'uid'
import { useFirebaseStorage } from 'vuefire'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

// subir las imagenes a firebase y devolver la url donde se encuentra

export default function useImage() {

    const url = ref('')
    const storage = useFirebaseStorage()

    const onFileChange = e => {
        // console.log(e.target.files)
        const file = e.target.files[0]
        const filename = uid() + '.jpg'
        const sRef = storageRef(storage, '/pets/' + filename)

        // Sube el archivo
        const uploadTask = uploadBytesResumable(sRef, file) 
        // sref -> donde quieres subir el archivo
        // file -> que archivo quieres subir

        uploadTask.on('state_changed', 
            () => {}, // cuando la imagen se esta subiendo
            (error) => console.log(error), // acceder all error
            () => { 
                // La imagen ya se subio
                getDownloadURL(uploadTask.snapshot.ref) 
                    .then( (downloadURL) => {
                        // console.log(downloadURL)
                        url.value = downloadURL
                    })
            }
        )
    }

    const isImageUploaded = computed(() => {
        return url.value ? url.value : null
    }) 


    return {
        url,
        onFileChange,
        isImageUploaded
    }
}