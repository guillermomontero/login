import Vue from 'vue';
import Vuex from 'vuex';
import { auth, db } from '@/firebase';
import router from '@/router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: '',
  },
  mutations: {
    nuevoUsuario(state, payload) {
      if (payload === null) {
        state.usuario = '';
      } else {
        state.usuario = payload;
      }
    }
  },
  actions: {
    async setUsuario({ commit }, user) {

      try {
        // Preguntamos si el usuario que viene del login tiene o no un documento, foto de perfil en este caso
        const doc =  await db.collection('usuarios').doc(user.uid).get()
        if (doc.exists) {
          commit('nuevoUsuario', doc.data())
        } else {
          const usuario = {
            nombre: user.displayName,
            email: user.email,
            uid: user.uid,
            foto: user.photoURL
          }
          // Guardamos el usuario en firestore
          await db.collection('usuarios').doc(usuario.uid).set(usuario)
          // console.log('Usuario guardado en DB')
          commit('nuevoUsuario', usuario);
        }
        
      } catch (error) {
        console.log(error)
      }
      
    },

    cerrarSesion({ commit }) {
      auth.signOut();
      commit('nuevoUsuario', null);
      router.push({ name: 'ingreso' })
    }
  },
  modules: {
  }
})
