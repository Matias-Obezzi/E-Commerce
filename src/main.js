import Vue from 'vue'
import VueRx from 'vue-rx'
import App from './App.vue'
import router from './router.js'
import firebase from 'firebase'
require('firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyCMJwcajeIZpHknAD3Ho_m4pjXgWkPvG80",
  authDomain: "ludetex-mo.firebaseapp.com",
  databaseURL: "https://ludetex-mo.firebaseio.com",
  projectId: "ludetex-mo",
  storageBucket: "ludetex-mo.appspot.com",
  messagingSenderId: "515780315761",
  appId: "1:515780315761:web:10a62031f1248cffed29d0",
  measurementId: "G-2RP2QM8LED"
};

firebase.initializeApp(firebaseConfig).firestore();
firebase.analytics();

Vue.config.productionTip = false
Vue.use(VueRx)

let app = null

firebase.auth().onAuthStateChanged(()=>{
  if(!app){
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})