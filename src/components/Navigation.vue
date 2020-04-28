<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom" id="menu">
            <router-link class="navbar-brand" :to="{name: 'Home'}">
                <img src="../assets/logo-nav.png" height="30">
            </router-link>
            <div class="col text-right ml-auto row justify-content-end" v-if="mobile">
                <button class="btn btn-outline-light row mx-2 p-0 badge-pill" data-toggle="modal" data-target="#cart" v-if="cart" @click.prevent="setCart()">
                    <h5 class="badge badge-pill badge-info m-0">{{numberProductsCart()}}<span class="material-icons align-middle">shopping_cart</span></h5>
                </button>    
                <button class="btn btn-light my-0 p-0" type="button">
                    <span class="material-icons p-2" id="mobile-menu-button">menu</span>
                </button>
            </div>
            <div class="collapse navbar-collapse w-100" id="menu-mobile">
                <ul class="navbar-nav mt-2 mt-lg-0">
                    <li class="nav-item" :class="{'active':this.$route.path == '/'}">
                        <router-link class="nav-link" :to="{name:'Home'}">
                            <span class="material-icons align-middle" v-if="mobile">home</span>
                            Inicio
                        </router-link>
                    </li>
                    <li class="nav-item" :class="{'active':this.$route.path == '/Productos'}">
                        <router-link class="nav-link" :to="{name:'Products'}">
                            <span class="material-icons align-middle" v-if="mobile">shop</span>
                            Productos
                        </router-link>
                    </li>
                    <li class="nav-item" :class="{'active':this.$route.fullPath == '/#Contacto'}" v-if="this.$route.path == '/'">
                        <a href="/#Contacto" class="nav-link">
                            <span class="material-icons align-middle" v-if="mobile">call</span>
                            Contacto
                        </a>
                    </li>
                    <li class="nav-item" :class="{'border-left':!mobile}" v-if="mobile">
                        <router-link class="nav-link" :to="{name:'Profile'}" :class="{'active':this.$route.path == '/Perfil'}" v-if="user">
                            <span class="material-icons align-middle" v-if="mobile">person</span>
                            {{user.first_name}}
                        </router-link>
                        <router-link class="nav-link" :to="{name:'Login'}" :class="{'active':this.$route.path == '/InicioSesion'}" v-else>
                            <span class="material-icons align-middle" v-if="mobile">person_outline</span>
                            Iniciar sesión
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="mobile">
                        <div class="nav-link link" @click.prevent="logOut()" v-if="user">
                            <span class="material-icons align-middle" v-if="mobile">person_add_disabled</span>
                            Cerrar sesión
                        </div>
                        <router-link class="nav-link" :to="{name:'Register'}" :class="{'active':this.$route.path == '/Registro'}" v-else>
                            <span class="material-icons align-middle" v-if="mobile">person_add </span>
                            Registrarse
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="col-6 text-right row justify-content-end row" v-if="!mobile">
                <div class="nav-item dropdown ml-auto" v-if="user">
                    <a class="nav-link dropdown-toggle" href="#" id="login" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{user.first_name}}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="login">
                        <router-link class="nav-link dropdown-item" :to="{name:'Profile'}" :class="{'active':this.$route.path == '/Perfil'}">
                            <span class="material-icons align-middle" v-if="mobile">person</span>
                            Perfil
                        </router-link>
                        <div class="nav-link dropdown-item link" @click.prevent="logOut()">
                            <span class="material-icons align-middle" v-if="mobile">person_add_disabled</span>
                            Cerrar sesión
                        </div>
                    </div>
                </div>
                <div class="nav-item justify-content end" v-else>
                    <a class="nav-link dropdown-toggle" href="#" id="login" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Iniciar sesion
                    </a>
                    <div id="loginForm" class="dropdown-menu dropdown-menu-right" aria-labelledby="login">
                        <Login class="p-4 mx-auto"  :mobile="mobile" />
                    </div>
                </div>
                <div type="button" class="link my-auto align-middle" data-toggle="modal" data-target="#cart" id="cart-button">
                    <h5 class="badge badge-pill badge-info m-0">{{numberProductsCart()}}<span class="material-icons align-middle">shopping_cart</span></h5>
                </div>
            </div>
        </nav>
        <div class="progress fixed-top bg-info rounded-0" :style="'transform:translateY(-5px); height:10px; width:' + scrolled"></div>
        <!-- Modal -->
        <div class="modal fade" id="cart" tabindex="-1" role="dialog" aria-labelledby="cart-content" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="cart-content">Carrito</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <table class="table container-fluid" v-if="cart.length>0">
                            <tr class="w-100 border-bottom">
                                <th class="border-right border-left pb-0 text-center px-0"><b class="text-capitalized text-center">Codigo</b></th>
                                <th class="border-right pb-0 text-center px-0 text-capitalize text-center">Nombre</th>
                                <th class="border-right pb-0 text-center px-0 text-capitalize text-center">Color</th>
                                <th class="border-right pb-0 text-center px-0 text-center">Largo rollo</th>
                                <th class="border-right pb-0 text-center px-0 text-center justify-content-center">Cantidad</th>
                                <th class="border-right pb-0 text-right">Precio</th>
                                <th class="pb-0 mx-auto text-center border-right">Eliminar</th>
                            </tr>
                            <tr class="w-100 border-bottom" v-for="(item, index) in cart" :key="index">
                                <th class="border-right border-left pb-0 text-center px-0"><b class="text-capitalized text-center">{{item.code}}</b></th>
                                <th class="border-right pb-0 text-center px-0 text-capitalize font-weight-normal text-center">{{item.name}}</th>
                                <th class="border-right pb-0 text-center px-0 text-capitalize font-weight-normal text-center">{{item.color}}</th>
                                <th class="border-right pb-0 text-center px-0 font-weight-normal text-center">{{item.long}} mts.</th>
                                <th class="border-right pb-0 text-center px-0 text-center justify-content-center">
                                    <button class="btn align-middle p-0 mx-2" @click.prevent="actionProdCart(item,false)">
                                        <span class="material-icons bg-danger text-light rounded-circle mx-auto">remove</span>
                                    </button>
                                    {{item.quantity}}
                                    <button class="btn align-middle p-0 mx-2" @click.prevent="actionProdCart(item,true)">
                                        <span class="material-icons bg-success text-light rounded-circle mx-auto">add</span>
                                    </button>
                                </th>
                                <th class="border-right pb-0 text-right">${{toFloat(item.quantity * item.price)}}</th>
                                <th class="pb-0 mx-auto text-center border-right"><span class="material-icons bg-danger rounded text-light text-center link mx-auto" @click.prevent="removeCart(item)">close</span></th>
                            </tr>
                            <tr class="w-100 border-bottom">
                                <th class="border-left">Total:</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th class="text-center">{{numberProductsCart()}}</th>
                                <th class="text-right">${{getTotal().toFixed(2)}}</th>
                                <th class="pb-0 mx-auto text-center border-right"><span class="material-icons bg-danger rounded text-light text-center link mx-auto" @click.prevent="removeCart()">remove_shopping_cart</span></th>
                            </tr>
                        </table>
                        <div class="m-auto text-center" v-else>
                            <p class="my-auto">Agrega productos a tu carrito <span class="material-icons align-middle" >shopping_cart</span> con los botones de añadir <span class="material-icons align-middle" >add_shopping_cart</span> y los podrás ver acá 😉</p>
                        </div>
                    </div>
                    <div class="modal-footer">  
                        <button type="button" class="btn btn-primary" :class="{'disabled':cartTop.length==0}" @click.prevent="confirmCart()">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import $ from 'jquery'
import Login from '@/views/auth/Login.vue'
import 'bootstrap/js/src/modal'
import 'bootstrap/js/src/collapse'

let scroll = 0;
let winScroll = 0;

export default {
    name:"Navigation",
    components:{
        Login
    },
    props:['products', 'cartTop', 'mobile', 'user'],
    data(){
        return{
            cart:[],
            scrolled:0,
            click : false,
            clickTemp: false
        }
    },
    watch:{
        cart: function(newVal){
            this.cart = newVal;
        }
    },
    created: function () {
        window.addEventListener('scroll', this.handleScroll);
        document.addEventListener('click', this.setMenu);
    },
    destroyed: function () {
        window.removeEventListener('scroll', function(e){
            this.handleScroll(e)
        });
    },
    methods:{
        handleScroll: function () {
            winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var scrolled = (winScroll / height) * 100;
            this.scrolled = scrolled + "%;";
            if(scroll-200-winScroll !=0){
                scroll = winScroll
                this.setMenu()
            }
            if(!this.mobile){
                this.toggleDropdown()
            }
        },
        setMenu: function(e){
            if(e && e.target.id == 'mobile-menu-button'){
                $('.navbar-collapse').collapse('toggle');
            }else{
                $('.navbar-collapse').collapse('hide');
            }
        },
        setCart(){
            this.cart = this.cartTop;
        },
        numberProductsCart(){
            this.setCart()
            var cont=0;
            this.cart.forEach(function(prod){
                cont = cont + prod.quantity;
            })
            return cont;
        },
        getTotal(){
            var total = 0;
            this.cart.forEach(function(prod){
                total = total + (prod.quantity * prod.price);
            })
            return total;
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
        removeCart(item){
            this.cart = this.cartTop;
            if(item){
                var index = this.findIndex(item);
                if(this.cart.length>1){
                    this.cart.splice(index,1);  
                }else{
                    this.cart = [];
                }
            }else{
                this.cart = []
            }
            this.$emit('cartUpdate', this.cart)
        },
        actionProdCart(item, add){
            if(add){
                item.quantity+=1;
            }else{
                if(item.quantity==1){
                    this.removeCart(item);
                }else{
                    item.quantity-=1;
                }
            }
        },
        findIndex(prod){
            return this.cart.findIndex(prodTemp => prod.code == prodTemp.code && prod.long == prodTemp.long && prod.color == prodTemp.color)
        },
        confirmCart(){
            this.setCart();
            if(this.cartTop.length>0){
                if(this.user){
                    var data={
                        time: new Date(),
                        cart: []
                    }
                    for(var cont = 0; cont < this.cart.length; cont++){
                        data.cart.push(this.cart[cont]);
                    }
                    firebase.firestore().collection('users').doc(this.user.email).update({
                        carts: firebase.firestore.FieldValue.arrayUnion(data)
                    })
                    this.$emit('cartUpdate', [])
                }else{
                    if(this.mobile){
                        this.$router.push({name:'Login'})
                    }else{
                        this.toggleDropdown()
                    }
                }
                $("#cart").modal('toggle')
                $('.modal-backdrop').hide();
            }
        },
        logOut(){
            firebase.auth().signOut().then(()=>{
                this.$router.push({name: 'Login'})
            })
        },
        toggleDropdown(){
            
            $("#loginForm").removeClass("show")
        }
    }
}
</script>

<style scoped>
</style>