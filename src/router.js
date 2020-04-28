import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Products from './views/Products.vue'
import Register from './views/auth/Register.vue'
import Login from './views/auth/Login.vue'
import Profile from './views/Profile.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/:id',
      name: 'Home-id',
      component: Home,
      meta:{
        anonymous: true,
        requiresAuth: false
      }
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta:{
        anonymous: true,
        requiresAuth: false
      }
    },
    {
      path: '/Productos',
      name: 'Products',
      component: Products,
      meta:{
        anonymous: true,
        requiresAuth: false
      }
    },
    {
      path: '/Registro',
      name: 'Register',
      component: Register,
      meta:{
        requiresAuth: false
      }
    },
    {
      path: '/InicioSesion',
      name: 'Login',
      component: Login,
      meta:{
        requiresAuth: false,
        mobile: true
      }
    },
    {
      path: '/Perfil',
      name: 'Profile',
      component: Profile,
      meta:{
        requiresAuth: true
      }
    },
  ],
  mode: "history"
});


router.beforeEach((to, from, next)=>{
  const user = firebase.auth().currentUser;
  if(to.matched.some(ruta=>ruta.meta.requiresAuth)){
    if(user){
      next();
    }else{
      next({
        name: 'Login'
      })
    }
  }else{
    if(to.matched.some(ruta=>ruta.meta.anonymous)){
      next();
    }else{
      if(user){
        next({
          name: 'Home'
        })
      }else{
        if(to.matched.some(ruta=>ruta.meta.mobile) && window.screen.width < 991){
          next();
        }else if(!to.matched.some(ruta=>ruta.meta.mobile)){
          next();
        }else{
          next({
            name: 'Home'
          })
        }
      }
    }
  }
});

export default router
