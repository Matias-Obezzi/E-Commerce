<template>
    <form class="container mt-5" @submit.prevent="register()" style="height: 100%">
        <div class="form-row">
            <div class="col-lg col-sm-12 m-1">
                <label for="first-name">Nombre</label>
                <input type="text" class="form-control" :class="{'is-invalid':error.first_name && state.first_name}" id="first-name" placeholder="Nombre" v-model="form.first_name" v-on:input="stringVal(form.first_name, 'first_name')" required>
                <div class="invalid-feedback text-light bg-danger text-center rounded">
                    {{state.first_name}}
                </div>
                <label for="first-name" class="form-text text-muted small">Solo caracteres alfabéticos</label>
            </div>
            <div class="col-lg col-sm-12 m-1">
                <label for="last-name">Apellido</label>
                <input type="text" class="form-control" :class="{'is-invalid':error.last_name && state.last_name}" id="last-name" placeholder="Apellido" v-model="form.last_name" v-on:input="stringVal(form.last_name, 'last_name')" required>
                <label for="last-name" class="form-text text-muted small">Solo caracteres alfabéticos</label>
                <div class="invalid-feedback text-light bg-danger text-center rounded">
                    {{state.last_name}}
                </div>
            </div>
            <div class="col-lg col-sm-12 m-1">
                <label for="mobile">Teléfono de contacto</label>
                <input type="num" class="form-control" id="mobile" placeholder="Teléfono o celular" v-model="form.phone" required>
                <label for="first-name" class="form-text text-muted small">Con numero de área</label>
            </div>
        </div>
        <div class="form-row">
            <div class="col-lg col-sm-12 m-1">
                <label for="city">Ciudad</label>
                <input type="text" class="form-control" :class="{'is-invalid':error.city && state.city}" id="city" placeholder="Ciudad" v-model="form.city"  v-on:input="stringVal(form.city, 'city')" required>
                <label for="city" class="form-text text-muted small">Sin caracteres especiales</label>
                <div class="invalid-feedback text-light bg-danger text-center rounded">
                    {{state.city}}
                </div>
            </div>
            <div class="col-lg col-sm-12 m-1">
                <label for="prov">Provincia</label>
                <input type="text" class="form-control" :class="{'is-invalid':error.province && state.province}" id="prov" placeholder="Provincia" v-model="form.province"  v-on:input="stringVal(form.province, 'province')" required>
                <label for="prov" class="form-text text-muted small">Sin caracteres especiales</label>
                <div class="invalid-feedback text-light bg-danger text-center rounded">
                    {{state.province}}
                </div>
            </div>
            <div class="col-lg col-sm-12 m-1">
                <label for="country">País</label>
                <input type="text" class="form-control" :class="{'is-invalid':error.country && state.country}" id="country" placeholder="País" v-model="form.country"  v-on:input="stringVal(form.country, 'country')" required>
                <label for="country" class="form-text text-muted small">Sin caracteres especiales</label>
                <div class="invalid-feedback text-light bg-danger text-center rounded">
                    {{state.country}}
                </div>
            </div>
        </div>
        <div class="form-row">
            <div class="col-lg col-sm-12 m-1">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" placeholder="Email" v-model="form.email" required>
            </div>
            <div class="col-lg col-sm-12 m-1">
                <label for="password">Contraseña</label>
                <input type="password" class="form-control" :class="{'is-invalid':error.password && state.password}" id="password" placeholder="Contraseña" v-model="password" v-on:input="passwordVal(password)" required>
                <label for="first-name" class="form-text text-muted small">6 caracteres mínimo</label>
                <div class="invalid-feedback text-light bg-danger text-center rounded">
                    {{state.password}}
                </div>
            </div>
        </div>
        <div class="col text-light" v-if="state.general" :class="{'bg-danger':error.general && state.general, 'bg-success':!error.general && state.general}">
            {{state.general}}
        </div>
        <button type="submit" class="btn col" :class="{'btn-secondary disabled': invalid(), 'btn-primary': !invalid()}">Registrarme</button>
    </form>
</template>

<script>
import firebase from 'firebase';

export default {
    name:'Register',
    props:['mobile'],
    data(){
        return{
            form:{
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                city: '',
                province: '',
                country: '',
                carts:[],
                role: 'user'
            },
            error:{
                general: true,
                first_name: true,
                last_name: true,
                password: true,
                city: true,
                province: true,
                country: true
            },
            state:{
                general: '',
                first_name: '',
                last_name: '',
                password: '',
                city: '',
                province: '',
                country: ''
            },
            password: ''
        }
    },
    methods:{
        register(){
            if(!this.invalid()){
                var name = this.form.first_name + ' ' + this.form.last_name;
                firebase
                .auth()
                .createUserWithEmailAndPassword(this.form.email, this.password)
                .then(userFir => {
                    userFir.user.updateProfile({
                        displayName: name
                    });
                    firebase.auth().currentUser.sendEmailVerification();
                    this.error.general = false;
                    this.state.general = "Email de verificación enviado, verifica tu email para realizar confirmaciones de compra";
                })
                .catch(error => {
                    this.error.general = true;
                    if (
                        error.message ===
                        "The email address is already in use by another account."
                    ) {
                        this.state.general = "El email ya esta en uso con otra cuenta";
                    } else if (
                        error.message === "Password should be at least 6 characters"
                    ) {
                        this.state.general = "La contraseña debe contener mínimo 6 caracteres";
                    } else {
                        this.state.general = error.message;
                    }
                });
                if(!this.error.general){
                    firebase.firestore().collection("users").doc(this.form.email).set(this.form);
                    this.$router.push({name: 'Home'})
                }

            }
        },
        invalid(){
            return this.error.first_name || this.error.last_name || this.error.password || this.error.city || this.error.province;
        },
        stringVal(name, type){
            const specialCharacterRegex = new RegExp("^(?=.*[!@#$%^&*])");
            this.form[type] = name.toLowerCase();
            if (specialCharacterRegex.test(name)) {
                this.error[type] = true;
                this.state[type] = "No puede contener caracteres especiales o espacios";
                return false;
            }else if(name.length<1){
                this.error[type] = true;
                this.state[type] = "Muy corto";
            }else {
                this.state[type] = " ";
                this.error[type] = false;
                return true;
            }
        },
        passwordVal(password){
            if(password.length<6){
                this.error.password = true;
                this.state.password = 'Contraseña muy corta';
            }else{
                this.error.password = false;
                this.state.password = '';
            }
        }
    }
}
</script>