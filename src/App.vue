<template>
  <v-app>
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <div class="d-flex align-center headline">
        <router-link :to="{ name: 'home' }">
          <span class="link-bar">AppVue</span>
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <v-btn text large @click="cerrarSesion">
        <span class="mr-2">Cerrar sesión</span>
        <v-icon>fas fa-power-off</v-icon>
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

<style lang="css" scoped>
  .v-application a {
    text-decoration: none;
    color: #ffffff;
  }
</style>
