<template>
  <v-content>
    <v-row justify="center">
      <v-col cols="6">
        <v-card class="text-center">
          <v-card-text>
            <v-avatar>
              <img
                :src="usuario.foto"
                :alt="usuario.nombre"
              >
            </v-avatar>
          </v-card-text>
          <v-card-text>
            <h3>{{ usuario.nombre }}</h3>
          </v-card-text>
          <v-card-text>
            <input type="file" ref="boton" class="d-none" @change="buscarImagen($event)">
            <v-btn color="primary" @click="$refs.boton.click()" class="mr-3">Buscar imagen</v-btn>
            <v-btn color="secundary" :disabled="file === null" @click="subirImagen()" :loading="loading">Subir imagen</v-btn>
          </v-card-text>
        </v-card>
        <v-card v-if="msg !== null" class="text-center">
          <h4>{{ msg }}</h4>
        </v-card>
        <v-card v-if="file !== null" class="text-center">
          <h4>{{ file.name }}</h4>
          <v-img :src="urlTemp"></v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import { mapState } from 'vuex';
import { db, firebase, storage } from '@/firebase';

export default {
  name: 'Admin',

  data() {
    return {
      file: null,
      urlTemp: '',
      loading: false,
      msg: null
    }
  },

  computed: {
    ...mapState(['usuario'])
  },

  methods: {
    buscarImagen(event) {
      console.log(event.target.files[0])
      const tipoArchivo = event.target.files[0].type;

      if (tipoArchivo === 'image/jpeg' || tipoArchivo === 'image/png'){
        this.file = event.target.files[0];
        this.msg = null;
      } else {
        this.msg = 'Archivo no válido';
        this.file = null;
        return
      }


      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e) => {
        this.urlTemp = e.target.result;
      }
    },

    async subirImagen() {
      try {
        this.loading = true;
        // Creamos la referencia, le indicamos en que carpeta va a estar guardada la imagen
        const storageRef = storage.ref().child(this.usuario.email).child('foto perfil')
        // Con put() mandamos la imagen
        const res = await storageRef.put(this.file)
        const urlDescarga = await storageRef.getDownloadURL()
        this.usuario.foto =  urlDescarga;

        await db.collection('usuarios').doc(this.usuario.uid).update({
          foto: this.usuario.foto
        })

        this.msg = 'Archivo subido con éxito';
        this.file = null
        
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>