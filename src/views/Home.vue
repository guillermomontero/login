<template>
  <v-row>
    <v-col>
      <h3>Bienvenido {{ usuario.nombre }}</h3>
    </v-col>
  </v-row>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapState(['usuario'])
  }
}
</script>
