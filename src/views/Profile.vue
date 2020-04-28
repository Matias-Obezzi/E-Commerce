<template>
    <div class="container row py-4 mx-auto">
        <div class="col-lg-5 col-sm-12 text-center my-3" v-if="user">
            <div class="col mx-0" :class="{'border py-4':edit}">
                <b class="text-capitalize" v-if="!edit">{{user.first_name}} {{user.last_name}}</b>
                <div class="row" v-else>  
                    <b class="col-12">Nombre y apellido</b>
                    <input required class="text-capitalize bg-light text-center font-weight-bold m-2 form-control col" type="text" v-model="profileEdit.first_name">
                    <input required class="text-capitalize bg-light text-center font-weight-bold m-2 form-control col" type="text" v-model="profileEdit.last_name">
                </div>
            </div>
            <div class="col mx-0" :class="{'border py-4':edit}">
                <b>{{user.email}}</b>
            </div>
            <div class="col mx-0" :class="{'border py-4':edit}">
                <b v-if="!edit">{{user.phone}}</b>
                <div class="row" v-else>
                    <b class="col-12">Telefono</b>
                    <input required class="font-weight-bold bg-light text-center m-2 form-control" type="tel" v-model="profileEdit.phone">
                </div>
            </div>
            <div class="col mx-0" :class="{'border py-4':edit}">
                <b class="text-capitalize" v-if="!edit">{{user.city}}, {{user.province}}, {{user.country}}</b>
                <div class="row mx-2" v-else>
                    <b class="col-12">Ubicación</b>
                    <input required class="text-capitalize bg-light text-center font-weight-bold mx-1 form-control col-sm-12 col-md" type="text" v-model="profileEdit.city">
                    <input required class="text-capitalize bg-light text-center font-weight-bold mx-1 form-control col-sm-12 col-md" type="text" v-model="profileEdit.province">
                    <input required class="text-capitalize bg-light text-center font-weight-bold m-1 form-control col-sm-12 mx-auto" type="text" v-model="profileEdit.country">
                </div>
            </div>
            <!-- <div class="col my-2">
                <button class="btn btn-outline-info" @click.prevent="edit = true" v-if="!edit">
                    Editar
                </button>
                <div class="row mx-auto justify-content-center" v-else>
                    <button class="btn btn-danger mx-1" @click.prevent="edit = false">Cancelar</button>
                    <button class="btn btn-success mx-1" @click.prevent="saveEdit()">Confirmar</button>
                </div>
            </div> -->
        </div>
        <div class="col-lg-7 col-sm-12 text-center" :class="{'pt-3 border-top':mobile, 'border-left':!mobile}">
            <h5>Carritos</h5>
            <div v-if="user && (user.carts.length>0 || (cartTop && cartTop.length>0))">
                <div class="border-bottom border-top" v-if="cartTop.length>0">
                    <b>Carrito actual</b>
                    <table class="container-fluid table my-2">
                        <tr class="w-100 border-bottom">
                            <th class="border-right border-left pb-0 text-center px-0"><b class="text-capitalized text-center">Codigo</b></th>
                            <th class="border-right pb-0 text-center px-0 text-capitalize text-center">Nombre</th>
                            <th class="border-right pb-0 text-center px-0 text-capitalize text-center">Color</th>
                            <th class="border-right pb-0 text-center px-0 text-center">Largo rollo</th>
                            <th class="border-right pb-0 text-center px-0 text-center justify-content-center">Cantidad</th>
                            <th class="border-right pb-0 text-right">Precio</th>
                        </tr>
                        <tr class="w-100 border-bottom" v-for="(item, index) in cartTop" :key="index">
                            <th class="border-right border-left text-center px-0"><b class="text-capitalized text-center">{{item.code}}</b></th>
                            <th class="border-right text-center px-0 text-capitalize font-weight-normal text-center">{{item.name}}</th>
                            <th class="border-right text-center px-0 text-capitalize font-weight-normal text-center">{{item.color}}</th>
                            <th class="border-right text-center px-0 font-weight-normal text-center">{{item.long}} mts.</th>
                            <th class="border-right text-center">{{item.quantity}}</th>
                            <th class="border-right text-right">${{toFloat(item.quantity * item.price)}}</th>
                        </tr>
                        <tr class="w-100 border-bottom">
                            <th class="border-left">Total:</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th class="text-center">{{numberProductsCart(cartTop)}}</th>
                            <th class="text-right border-right">${{getTotal(cartTop).toFixed(2)}}</th>
                        </tr>
                    </table>
                </div>
                <div class="border-bottom border-top" v-for="(cart, indexCarrito) in user.carts" :key="indexCarrito">
                    <div class="col row mx-auto mt-2 text-center">
                        <b class="mr-auto my-auto">Carrito del {{getDate(cart.time.seconds)}}</b>
                        <button class="btn btn-outline-success ml-auto" @click.prevent="loadCart(cart.cart)">
                            <span class="material-icons align-middle">
                                add_shopping_cart
                            </span>
                        </button>
                        <button class="btn btn-outline-danger mx-2" @click.prevent="deleteCart(cart)">
                            <span class="material-icons align-middle">
                                remove_shopping_cart
                            </span></button>
                    </div>
                    <table class="container-fluid table my-2">
                        <tr class="w-100 border-bottom">
                            <th class="border-right border-left pb-0 text-center px-0"><b class="text-capitalized text-center">Codigo</b></th>
                            <th class="border-right pb-0 text-center px-0 text-capitalize text-center">Nombre</th>
                            <th class="border-right pb-0 text-center px-0 text-capitalize text-center">Color</th>
                            <th class="border-right pb-0 text-center px-0 text-center">Largo rollo</th>
                            <th class="border-right pb-0 text-center px-0 text-center justify-content-center">Cantidad</th>
                            <th class="border-right pb-0 text-right">Precio</th>
                        </tr>
                        <tr class="w-100 border-bottom" v-for="(item, index) in cart.cart" :key="index">
                            <th class="border-right border-left text-center px-0"><b class="text-capitalized text-center">{{item.code}}</b></th>
                            <th class="border-right text-center px-0 text-capitalize font-weight-normal text-center">{{item.name}}</th>
                            <th class="border-right text-center px-0 text-capitalize font-weight-normal text-center">{{item.color}}</th>
                            <th class="border-right text-center px-0 font-weight-normal text-center">{{item.long}} mts.</th>
                            <th class="border-right text-center">{{item.quantity}}</th>
                            <th class="border-right text-right">${{toFloat(item.quantity * item.price)}}</th>
                        </tr>
                        <tr class="w-100 border-bottom">
                            <th class="border-left">Total:</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th class="text-center">{{numberProductsCart(cart.cart)}}</th>
                            <th class="text-right border-right">${{getTotal(cart.cart).toFixed(2)}}</th>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="text-center my-autole" v-else>
                <hr class="w-50">
                <b class="w-100">- Realiza algún carrito para ver los productos acá -</b>
                <hr class="w-50">
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'Profile',
    props:['user', 'cartTop', 'mobile'],
    data(){
        return{
            edit: false,
            profileEdit: null,
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
        }
    },
    watch:{
        edit: function(newVal){
            if(newVal){
                this.profileEdit = this.user;
            }else{
                this.profileEdit = null;
            }
        }
    },
    methods:{
        getTotal(cart){
            var total = 0;
            cart.forEach(function(prod){
                total = total + (prod.quantity * prod.price);
            })
            return total;
        },
        numberProductsCart(cart){
            var cont=0;
            cart.forEach(function(prod){
                cont = cont + prod.quantity;
            })
            return cont;
        },
        toFloat(number, decPlaces, decSep, thouSep) {
            decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
            decSep = typeof decSep === "undefined" ? "," : decSep;
            thouSep = typeof thouSep === "undefined" ? "." : thouSep;
            var sign = number < 0 ? "-" : "";
            var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
            var j = (j = i.length) > 3 ? j % 3 : 0;

            return sign +
                (j ? i.substr(0, j) + thouSep : "") +
                i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
                (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
        },
        getDate(time){
            var timeTemp = new Date(time * 1000);
            return timeTemp.toLocaleString().split(" ")[0];
        },
        register(){
            if(!this.invalid()){
                var name = this.profileEdit.first_name + ' ' + this.profileEdit.last_name;
                firebase
                .auth()
                .createUserWithEmailAndPassword(this.profileEdit.email, this.password)
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
                    firebase.firestore().collection("users").doc(this.profileEdit.email).set(this.profileEdit);
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
        deleteCart(cart){
            firebase.firestore().collection("users").doc(this.user.email).update({
                carts: firebase.firestore.FieldValue.arrayRemove(cart)
            })
        },
        loadCart(cart){
            var temp = [];
            var tempProd = null;
            for(var cont = 0; cont < cart.length; cont++){
                tempProd ={
                    name: cart[cont].name,
                    code: cart[cont].code,
                    width: cart[cont].width,
                    color: cart[cont].color,
                    long: cart[cont].long,
                    price: cart[cont].price,
                    quantity: cart[cont].quantity
                };
                temp.push(tempProd)
            }
            this.$emit('cartUpdate', temp)
        }
    }
}
</script>