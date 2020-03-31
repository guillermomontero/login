<template>
  <v-content>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <h3>Bienvenido {{ usuario.nombre }}</h3>
          </v-card-text>
          <v-card-text style="height: 60vh; overflow: auto;" v-chat-scroll>
            <div
              v-for="(item, index) in mensajes"
              :class="item.nombre === usuario.nombre ? 'text-right' : 'text-left'"
              :key="index"
            >
              <v-chip
                class="ma-2"
                color="indigo"
                text-color="white"
              >
                <v-avatar left>
                  <v-img :src="item.foto" :alt="item.nombre"/>
                </v-avatar>
                {{ item.mensaje }}
              </v-chip>
              <p class="caption mr-2">{{ item.fecha }}</p>
            </div>
          </v-card-text>
          <v-card-text>
            <v-form @submit.prevent="enviarMensaje" v-model="valido">
              <v-text-field
                v-model="mensaje"
                label="Escribe tu mensaje aquí"
                required
                :rules="reglas"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import { mapState } from "vuex";
import { db } from '@/firebase';
import moment from "moment";

export default {
  name: 'Chat',

  data() {
    return {
      mensaje: '',
      valido: false,
      reglas: [
        v => !!v || 'Tienes que escribir un mensaje',
      ],
      mensajes: [],
    }
  },

  computed: {
    ...mapState(['usuario'])
  },

  methods: {
    enviarMensaje() {
      if (this.valido) {
        console.log('Enviaste el mensaje:', this.mensaje)
        db.collection('chat').add({
          mensaje: this.mensaje,
          nombre: this.usuario.nombre,
          foto: this.usuario.foto,
          fecha: Date.now()
        }).catch((error) => {
          console.log(error)
        })
        this.mensaje = '';
      } else {
        console.log('No escribiste nada')
      }
    }
  },

  created() {
    moment.locale('es');
    let ref = db.collection('chat').orderBy('fecha', 'desc').limit(10)

    ref.onSnapshot((querySnapshot) => {
      this.mensajes = []
      querySnapshot.forEach((doc) => {
        this.mensajes.unshift({
          mensaje: doc.data().mensaje,
          foto: doc.data().foto,
          nombre: doc.data().nombre,
          fecha: moment(doc.data().fecha).format('lll')
        })
      })
      console.log(this.mensajes)
    })
  }
}
</script>