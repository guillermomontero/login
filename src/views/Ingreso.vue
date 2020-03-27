<template>
  <div>
    <v-row justify-center class="mt-5">
      <v-col cols="12" md="6" lg="4">
        <v-card>
          <v-card-text class="display-1 text-uppercase primary white--text text-center" :class="registro ? 'success' : 'accent'">
            <span v-if="!registro">Ingreso</span>
            <span v-else>Registro</span>
          </v-card-text>
          <v-card-text>
            <v-btn block color="error" @click="google">
              <v-icon right dark>fab fa-google</v-icon>
              Google
            </v-btn>
            <v-btn block color="info">
              <v-icon right dark>fab fa-facebook-f</v-icon>
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
import { firebase, auth, db } from '@/firebase'
export default {
  name: 'ingreso',
  data() {
    return {
      registro: false
    }
  },
  methods: {
    async google() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().languageCode = 'es';

      try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        // console.log(user)

        // Construimos usuario
        const usuario = {
          nombre: user.displayName,
          email: user.email,
          uid: user.uid,
          foto: user.photoURL
        }

        // Guardamos el usuario en firestore
        await db.collection('usuarios').doc(usuario.uid).set(usuario)
        // console.log('Usuario guardado en DB')

      } catch (error) {
        console.log(error)
      }

    }
  }
}
</script>