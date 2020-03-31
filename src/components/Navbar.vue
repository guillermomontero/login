<template>
  <nav>
    <v-app-bar app color="indigo" dark >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
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

    <v-navigation-drawer v-model="drawer" app color="indigo" dark>
      <v-container>
        <v-row justify="center" align="center" class="mt-5">
          <v-col align="center">
            <v-avatar>
              <img
                :src="usuario.foto"
                alt="John"
              >
            </v-avatar>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col align="center">
            <p class="white--text">{{ usuario.nombre }}</p>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-list>
        <v-list-item link v-for="(item, index) of items" :key="index" :to="item.url">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Navbar',

  data() {
    return {
      drawer: true,
      items: [
        { title: 'Dashboard', icon: 'fas fa-tachometer-alt', url: { name: 'home'} },
        { title: 'Perfil', icon: 'fas fa-address-card', url: { name: 'ingreso'} },
        { title: 'Admin', icon: 'fas fa-user-shield', url: { name: 'admin'} },
        { title: 'Chat', icon: 'fas fa-comments', url: { name: 'chat'} },
      ],
    }
  },

  computed: {
    ...mapState(['usuario'])
  },

  methods: {
    ...mapActions(['cerrarSesion'])
  }
}
</script>

<style lang="css" scoped>
  .v-application a {
    text-decoration: none;
    color: #ffffff;
  }
</style>