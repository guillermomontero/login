<template>
  <div>
    <v-row justify-center align="center" justify="center" class="mt-5">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-text class="headline text-uppercase white--text text-center" :class="registro ? 'success' : 'indigo darken-1'">
            <span v-if="!registro">Ingreso</span>
            <span v-else>Registro</span>
          </v-card-text>
          <v-card-text>
            <v-btn block color="error" class="my-2" @click="google">
              <v-icon right dark class="mr-2">fab fa-google</v-icon>
              Google
            </v-btn>
            <v-btn block color="info" class="my-2" @click="facebook">
              <v-icon right dark class="mr-2">fab fa-facebook-f</v-icon>
              Facebook
            </v-btn>
          </v-card-text>
          <v-card-text>
            <v-btn block @click="registro = true" v-if="!registro">¿No tienes cuenta? Regístrate aquí</v-btn>
            <v-btn block @click="registro = false" v-else>¿Ya tienes cuenta? Ingresa aquí</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { firebase, auth, db } from '@/firebase';
import { mapMutations, mapActions } from 'vuex';
import router from '@/router'

export default {
  name: 'ingreso',
  data() {
    return {
      registro: false
    }
  },
  methods: {
    ...mapMutations(['nuevoUsuario']),
    ...mapActions(['setUsuario']),
    facebook() {
      const providerFB = new firebase.auth.FacebookAuthProvider();
      this.ingresar(providerFB)
    },
    google() {
      const providerGL = new firebase.auth.GoogleAuthProvider();
      this.ingresar(providerGL)
    },

    async ingresar(provider) {
      firebase.auth().languageCode = 'es';

      try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        // console.log(user)

        this.setUsuario(user)

        router.push({ name: 'home'})

      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>