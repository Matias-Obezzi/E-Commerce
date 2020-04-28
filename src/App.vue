<template>
  <div id="app" class="bg-light">
    <div v-if="products">
      <Navigation class="fixed-top" :user="user" :mobile="mobile" :products="products" v-on:cartUpdate="cartUpdate" :cartTop="cart" />
      <router-view class="pt-5" :user="user" v-on:cartUpdate="cartUpdate" :products="products" :categoryList="cat" :colorList="color" :cartTop="cart" :mobile="mobile" />
      <Footer :mobile="mobile" :user="user" />
      <div class="w-100 text-right fixed-bottom">
        <button class="btn btn-info m-4 d-none" id="buttonTop" @click.prevent="goTop()">
          <span class="material-icons align-middle">
            arrow_upward
          </span>
        </button>
      </div>
    </div>
    <div class="text-center" v-else>
      <img src="./assets/logo-nav.png" class="bg-light p-3 my-3 rounded col-3 mx-auto" style="z-index:9999">
      <div class="loading bg-light">
        <div class="loader">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue"
import Footer from "./components/Footer.vue"
import firebase from "firebase";
import { Observable } from "rxjs";
import $ from 'jquery'

function format(data){
  return {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    phone: data.phone,
    city: data.city,
    province: data.province,
    country: data.country,
    carts: data.carts.reverse(),
    role: data.role
  }
}

export default {
  name: 'App',
  components: {
    Navigation,
    Footer
  },
  subscriptions(){
      return{
        products: this.getProducts(this.cat, this.color),
        user: this.getUserDB()
      }
  },
  created(){
    $(window).scroll(function() {
      var height = $(window).scrollTop();
      if (height > 100) {
        $('#buttonTop').removeClass('d-none');
        $('#buttonTop').fadeIn();
      } else {
        $('#buttonTop').fadeOut();
      }
    });
  },
  watch:{
    $route(){
      $("html, body").animate({ scrollTop: 0 }, "fast");
    }
  },
  data(){
    return{
      cat: ['todos'],
      color: ['blanco'],
      cart:[],
      mobile: window.screen.width < 991,
    }
  },
  methods:{
    goTop(){
      $("html, body").animate({ scrollTop: 0 }, "fast");
    },
    cartUpdate(value){
      this.cart = value;
    },
    getProducts(cat, color){
      return Observable.create(function(observer){
        firebase.firestore().collection("products").orderBy("category", "desc").onSnapshot(snapshot => {
          observer.next(snapshot.docs.map(function(snapshot){
            var data = {
              name: snapshot.data().name,
              image: snapshot.data().image,
              code: snapshot.data().code,
              color: snapshot.data().color,
              width: snapshot.data().width,
              min:snapshot.data().min,
              max:snapshot.data().max,
              price:snapshot.data().price,
              category: snapshot.data().category,
              colorSelected: snapshot.data().color[0],
              id: snapshot.data().id
            }
            for(var cont = 0; cont < data.category.length; cont++){
              if(cat.indexOf(data.category[cont])==-1){
                cat.push(data.category[cont]);
              }
            }
            for(cont = 0; cont < data.color.length; cont++){
              if(color.indexOf(data.color[cont])==-1){
                color.push(data.color[cont]);
              }
            }
            return data;
          }));
        });
      })
    },
    getUserDB(){
      return Observable.create(function(observer) {
        firebase.auth().onAuthStateChanged(function(user){
          if(user){
            firebase
              .firestore()
              .collection("users")
              .doc(user.email)
              .onSnapshot(snapshot => {
                observer.next(format(snapshot.data()))
              });
          }else{
            observer.next(null);
          }
        });
      });
    },
  }
}
</script>

<style>
*{
  scroll-behavior: smooth;
}

.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place front is invalid - may break your css so removed */  
    padding-top: 100px; /* Location of the box - don't know what this does?  If it is to move your modal down by 100px, then just change top below to 100px and remove this*/
    left: 0;
    right:0; /* Full width (left and right 0) */
    top: 0;
    bottom: 0; /* Full height top and bottom 0 */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    z-index: 9999; /* Sit on top - higher than any other z-index in your site*/
}

.modal-backdrop {
  position:unset !important;
}

.loading {
    position: fixed;
    top: 0; right: 0;
    bottom: 0; left: 0;
    background: #fff;
}
.loader {
    left: 50%;
    margin-left: -4em;
    font-size: 10px;
    border: .8em solid rgba(218, 219, 223, 1);
    border-left: .8em solid rgba(58, 166, 165, 1);
    animation: spin 1.1s infinite linear;
}
.loader, .loader:after {
    border-radius: 50%;
    width: 8em;
    height: 8em;
    display: block;
    position: absolute;
    top: 50%;
    margin-top: -4.05em;
} 

@keyframes spin {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.caption {
  position: absolute;
  left: 0;
  width: 100%;
  text-align: center;
  color: #000;
}

.link{
  cursor: pointer;
}

@media (min-width: 1200px){
  .caption{
    top: 30%;
  }
  .parallax{
    height: 450px;
  }
}

@media (min-width: 992px) and (max-width: 1200px){
  .card-columns {
    -webkit-column-count: 2;
    -moz-column-count: 2;
    column-count: 2;
  }
  .caption{
    top: 20%;
  }
}

@media (max-width: 991px){
  .card-columns {
    -webkit-column-count: 1;
    -moz-column-count: 1;
    column-count: 1;
  }
  .caption{
    top: 15%;
  }
}


</style>
