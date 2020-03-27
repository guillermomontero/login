<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center headline text-uppercase">
        <router-link :to="{ name: 'home' }">
          <span>Vue</span>
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <v-btn @click="cerrarSesion">
        <span class="mr-2">Cerrar sesión</span>
        <v-icon>fas fa-address-book</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',

  data: () => ({
    //
  }),

  methods: {
    ...mapActions(['cerrarSesion'])
  }
};
</script>
