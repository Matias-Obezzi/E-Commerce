<template>
    <form class="text-center" :class="{'m-4 p-2':mobile}"  @submit.prevent="login()">
        <div class="col-12 my-2">
            <label for="email">Email</label>
            <input type="email" class="form-control mx-auto" id="email" placeholder="Email" v-model="email" required>
        </div>
        <div class="col-12 my-2">
            <label for="password">Contraseña</label>
            <input type="password" class="form-control mx-auto" id="password" placeholder="Contraseña" v-model="password" required>
        </div>
        <div class="col text-light bg-danger" v-if="error">
            {{error}}
        </div>
        <button type="submit" class="btn mx-auto col-12 m-3" :class="{'btn-secondary disabled': invalid(), 'btn-primary': !invalid()}">Iniciar sesión</button>
        <p class="text-center">No tenés cuenta? 
            <router-link :to="{name:'Register'}">
                Create una
            </router-link>
        </p>
    </form>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'Login',
    props:['mobile'],
    data(){
        return{
            email: '',
            password: '',
            error: ''
        }
    },
    methods:{
        login(){
            if(!this.invalid()){
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(()=>{
                    this.$router.push({name: 'Home'})
                }).catch(error=>{
                    if(error.message === "There is no user record corresponding to this identifier. The user may have been deleted."){
                        this.error = "No existe una cuenta asociada a ese email. Su cuenta puede haber sido borrada";
                    }else if(error.message === "The password is invalid or the user does not have a password."){
                        this.error = "Contraseña incorrecta"
                    }else{
                        this.error = error.message;
                    }
                })
            }else{
                this.error = "Todos los campos son requeridos"
            }
        },
        invalid(){
            return !this.password.length>0 || !this.email.length>0;
        }
    }
}
</script>