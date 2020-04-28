<template>
    <div class="container-fluid row border-top mx-auto py-3">
        <div class="col-sm-12 col-lg-4">
            <router-link class="my-3" :to="{name: 'Home'}">
                <img src="../assets/logo-footer.png" class="img-fluid mx-auto d-block" width="200">
            </router-link>  
            <a class="text-center nav-link p-0" href="http://www.cintasmalbo.com.ar/" target="_blank">
                <h3 class="my-3">Cintas Malbo</h3>
            </a>
        </div>
        <div class="col-lg">
            <div class="list-group list-group-horizontal-lg  mx-auto">
                <li class="list-group-item text-center bg-light border-0 list-group-item-action p-0">
                    <router-link class="nav-link" :to="{name:'Home'}" :class="{'active':this.$route.path == '/' }">
                        Inicio
                    </router-link>
                </li>
                <li class="list-group-item text-center bg-light border-0 list-group-item-action p-0">
                    <router-link class="nav-link" :to="{name:'Products'}" :class="{'active':this.$route.path == '/Productos'}">
                        Productos
                    </router-link>
                </li>
                <li class="list-group-item text-center bg-light border-0 list-group-item-action p-0">
                    <router-link v-if="this.$route.path!='/'" class="nav-link" :to='{name:"Home-id", params:{id:"Contacto"}}'>
                        Contacto
                    </router-link>
                    <a v-else href="#Contacto" class="nav-link">
                        Contacto
                    </a>
                </li>
                <li class="list-group-item text-center bg-light border-0 list-group-item-action p-0">
                    <router-link class="nav-link" :to="{name:'Profile'}" :class="{'active':this.$route.path == '/Perfil'}" v-if="user">
                        {{user.first_name}}
                    </router-link>
                    <router-link class="nav-link" :to="{name:'Login'}" :class="{'active':this.$route.path == '/InicioSesion'}" v-else-if="mobile">
                        Iniciar sesión
                    </router-link>
                    <div class="nav-link text-primary link" @click.prevent="toggleDropdown()" :class="{'active':this.$route.path == '/InicioSesion'}" v-else>
                        Iniciar sesión
                    </div>
                </li>
                <li class="list-group-item text-center bg-light border-0 list-group-item-action p-0">
                    <a href="#" @click.prevent="logOut()" class="nav-link stretched-link link"  v-if="user">
                        Cerrar sesion
                    </a>
                    <router-link class="nav-link" :to="{name:'Register'}" :class="{'active':this.$route.path == '/Registro'}" v-else>
                        Registrarse
                    </router-link>
                </li>
            </div>
            <br v-if="!mobile">
            <div class="col text-center my-2 align-text-bottom row mx-auto justify-content-center">
                <p class="mx-1 text-center">&copy;{{anio}} Ludetex</p>
                <p v-if="!mobile">|</p>
                <p class="mx-1 text-center">Realizada por <a href="https://www.linkedin.com/in/matias-obezzi" target="_blank">Matías Obezzi</a></p>
            </div>
        </div>
        
    </div>
</template>

<script>
import firebase from 'firebase'
import $ from 'jquery'
export default {
    name: 'Footer',
    props:['user', 'mobile'],
    data(){
        var anio = new Date().getFullYear();
        return{
            anio
        }
    },
    methods:{
        logOut(){
            firebase.auth().signOut().then(()=>{
                this.$router.push({name: 'Login'})
            })
        },
        toggleDropdown(){
            if($("#loginForm").hasClass("show")){
                $("#loginForm").removeClass("show")
            }else{
                $("#loginForm").toggle()
            }
        }
    }
}
</script>