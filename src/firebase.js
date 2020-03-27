const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');
require('firebase/storage');

const firebaseConfig = {
  apiKey: "AIzaSyDu1044fqkaiJRjiy1VjlfUO_Bmgz5SG_k",
  authDomain: "vue-login-6ecbf.firebaseapp.com",
  databaseURL: "https://vue-login-6ecbf.firebaseio.com",
  projectId: "vue-login-6ecbf",
  storageBucket: "vue-login-6ecbf.appspot.com",
  messagingSenderId: "258526281211",
  appId: "1:258526281211:web:e8044f7b91761a9f6fdf5e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { firebase, db, auth, storage };