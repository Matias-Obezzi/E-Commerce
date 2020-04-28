<template>
    <div class="container">
        <div v-if="user && (user.role=='admin' || user.role == 'ludetex')">
            <div class="col btn link text-center pb-0 font-weight-bold text-light" @click="inputProduct=!inputProduct" :class="{'bg-success':!inputProduct, 'bg-danger':inputProduct}">
                <p class="pb-0 mb-2" v-if="!inputProduct">Abrir agregar producto</p>
                <p class="pb-0 mb-2" v-else>Cerrar agregar producto</p>
            </div>
            <div class="form-group p-2 m-2 rounded border border-dark" v-if="inputProduct">
                <div class="row m-2">
                    <div class="col-sm-12 col-lg mb-2 mx-auto text-center">
                        <label for="code">Código: <b class="text-uppercase" v-if="form.code">{{form.code}}</b></label> 
                        <br v-if="!edit">
                        <input type="text" id="code" v-if="!edit" v-model="form.code" class="form-control col" v-on:input="form.code=lower(form.code)">
                    </div>  
                    <div class="col-sm-12 col-lg mb-2 mx-auto text-center">
                        <div class="col row">
                            <label for="name" class="col">
                            <input v-if="!edit" type="checkbox" v-model="hasName">Nombre: <b class="text-capitalize" v-if="form.name">{{form.name}}</b></label>
                        </div>
                        <input v-if="!edit && hasName" type="text" id="name" v-model="form.name" class="form-control pt-0" v-on:input="form.name=lower(form.name)">
                    </div>
                    <div class="col-sm-12 col-lg mx-auto text-center">
                        <label for="width">Ancho: <b v-if="form.width">{{form.width}} cm</b></label>
                        <br>
                        <input v-if="!edit" type="number" id="width" v-model="form.width" class="form-control col">
                    </div>
                </div>
                <hr class="bg-dark">
                <div class="row mx-auto">
                    <div class="col-sm-12 col-lg mb-2 mx-auto text-center">
                        <label for="color">Color: </label>
                        <select class="w-75 text-capitalize custom-select mb-2">
                            <option class="text-capitalize" :value="{color}" v-for="(color, index) in form.color" :key="index">{{color}}</option>
                        </select>
                        <br>
                        <div class="col-sm-12 col-lg row mx-auto" v-if="!edit">
                            <div class="row col-12 mx-auto" v-if="colorList && colorList.length>0">
                                <select id="color" v-model="tempColor" class="text-capitalize custom-select col">
                                    <option :value="color" v-for="(color, index) in colorList" :key="index" v-show="color != 'todos'" class="text-capitalize">{{color}}</option>
                                </select>
                                <button class="btn px-0" @click.prevent="addColor()">
                                    <span class="material-icons link bg-success rounded text-light" v-if="tempColor && form.color.indexOf(tempColor)==-1" @click.prevent="addColor()">add</span>
                                    <span class="material-icons link bg-danger rounded text-light" v-else-if="tempColor && form.color.indexOf(tempColor)!=-1" @click.prevent="addColor()">remove</span>
                                    <span class="material-icons bg-dark rounded text-light" v-else>cancel</span>
                                </button>
                            </div>
                            <div class="row col-12 mx-auto">
                                <input type="text" id="color" v-model="tempColor" class="text-capitalize form-control col" v-on:keyup.enter="addColor()" v-on:input="tempColor=lower(tempColor)">
                                <div class="btn px-0">
                                    <span class="material-icons link bg-success rounded text-light" v-if="tempColor && form.color.indexOf(tempColor)==-1" @click.prevent="addColor()">add</span>
                                    <span class="material-icons link bg-danger rounded text-light" v-else-if="tempColor && form.color.indexOf(tempColor)!=-1" @click.prevent="addColor()">remove</span>
                                    <span class="material-icons bg-dark rounded text-light" v-else>cancel</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg mx-auto text-center">
                        <label for="category">Categoría: </label>
                        <select class="w-50 text-capitalize custom-select mb-2">
                            <option class="text-capitalize" :value="{cate}" v-for="(cate, index) in form.category" :key="index">{{cate}}</option>
                        </select>
                        <br v-if="!edit">
                        <div class="col-sm-12 col-lg row mx-auto" v-if="!edit">
                            <div class="row col-12 mx-auto" v-if="categoryList && categoryList.length>0">
                                <select id="category" v-model="tempCategory" class="text-capitalize custom-select col">
                                    <option :value="cat" v-for="(cat, index) in categoryList" :key="index" v-show="cat != 'todos'" class="text-capitalize">{{cat}}</option>
                                </select>
                                <button class="btn px-0" @click.prevent="addCategory()">
                                    <span class="material-icons bg-success rounded text-light" v-if="tempCategory && form.category.indexOf(tempCategory)==-1">add</span>
                                    <span class="material-icons bg-danger rounded text-light" v-else-if="tempCategory && form.category.indexOf(tempCategory)!=-1">remove</span>
                                    <span class="material-icons bg-dark rounded text-light" v-else>cancel</span>
                                </button>
                            </div>
                            <div class="row col-12 mx-auto" v-if="user.role == 'admin'">
                                <input type="text" v-model="tempCategory" v-on:keyup.enter="addCategory()" v-on:input="tempCategory=lower(tempCategory)" class="text-capitalize form-control col">
                                <button class="btn px-0" @click.prevent="addCategory()">
                                    <span class="material-icons bg-success rounded text-light" v-if="tempCategory && form.category.indexOf(tempCategory)==-1">add</span>
                                    <span class="material-icons bg-danger rounded text-light" v-else-if="tempCategory && form.category.indexOf(tempCategory)!=-1">remove</span>
                                    <span class="material-icons bg-dark rounded text-light" v-else>cancel</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="bg-dark">
                <div class="row mx-2">
                    <div class="col-sm-12 mb-2 col-lg">
                        <div class="col mx-auto text-center">
                            <label for="width">Rollo pequeño: <b v-if="form.min.long">{{form.min.long}} mts</b></label>
                            <br>
                            <input type="number" id="width" v-model="form.min.long">
                        </div>
                        <div class="col mx-auto text-center">
                            <label for="width">Precio: <b v-if="form.min.price">${{toFloat(form.min.price)}}</b></label>
                            <br>
                            <input type="number" id="width" v-model="form.min.price">
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg">
                        <div class="col mx-auto text-center">
                            <label for="width">Rollo grande: <b v-if="form.max.long">{{form.max.long}} mts</b></label>
                            <br>
                            <input type="number" id="width" v-model="form.max.long">
                        </div>
                        <div class="col mx-auto text-center">
                            <label for="width">Precio: <b v-if="form.max.price">${{toFloat(form.max.price)}}</b></label>
                            <br>
                            <input type="number" id="width" v-model="form.max.price">
                        </div>
                    </div>
                </div>
                <hr class="bg-dark" v-if="!edit">
                <div class="input-group mb-3" v-if="!edit">
                    <label for="foto" class="input-group-prepend">
                        <span class="input-group-text">Imagen del producto</span>
                    </label>
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="foto" @change="updatePhoto">
                        <label class="custom-file-label" for="foto" v-if="tempImage!=null">{{tempImage.name}}</label>
                        <label class="custom-file-label" for="foto" v-else>Elegir imagen</label>
                    </div>
                    <div class="col-12 small text-muted">En lo posible que el nombre de la imagen sea el nombre del producto</div>
                </div>
                <hr class="bg-dark">
                <div class="row col">
                    <p class="col text-danger" v-if="state">{{state}}</p>
                    <button class="btn ml-auto btn-warning mx-2" v-if="edit" @click.prevent="deleteProduct()">Eliminar producto</button>
                    <button class="btn ml-auto btn-danger mx-2" v-if="edit" @click.prevent="cancelEdit()">Cancelar edición</button>
                    <button class="btn ml-auto" :class="{'btn-success':valEdit(), 'btn-secondary disabled':!valEdit()}" v-if="edit" @click.prevent="publish()">Publicar edición</button>
                    <button class="btn ml-auto" v-if="!edit" :class="{'btn-success':valProd(), 'btn-secondary disabled':!valProd()}" @click.prevent="publish()">Subir</button>
                </div> 
                <div class="progress m-2" v-if="progress!=0">
                    <div class="progress-bar" role="progressbar" :style="'width:'+ progress + '%'" aria-valuemin="0" aria-valuemax="100">{{progress}}%</div>
                </div>
            </div>
        </div>
        <div class="col bg-light row mx-auto py-1 sticky-top text-center justify-content-center" id="categoryList">
            <button class="btn text-capitalize m-1 py-0" @click.prevent="getProducts(category)" :class="{'btn-outline-dark':category!=cat, 'btn-dark': category==cat}" v-for="category in categoryList" :key="category">
                {{category}}
            </button>
        </div>
        <div class="card-columns col pt-2 mt-4 w-100" v-if="cart && products">
            <transition-group name="list" tag="p">
                <div class="card mb-3 bg-white" v-for="(prod, index) in productsShow" :key="index">
                    <div class="row no-gutters m-2">
                        <img class="card-img-top rounded" v-if="prod.image" :src="prod.image.url">
                        <div class="card-body" :class="{'pb-0 mb-1':prod.name, 'pb-4 mb-1':!prod.name}">
                            <h5 class="card-title row m-0">
                                <b class="text-uppercase">{{prod.code}}</b>
                                <div class="ml-auto btn btn-warning link" @click.prevent="editProduct(prod)" v-if="user && (user.role=='admin' || user.role == 'ludetex')">
                                    Editar
                                </div>
                            </h5>
                            <hr>
                            <div class="card-text text-capitalize">
                                <b v-if="prod.name">{{prod.name}}</b>
                                <br v-if="prod.name">
                                Ancho: <b>{{toFloat(prod.width,0)}} cm.</b>
                                <br>
                                <div class="row m-0 ">
                                    <div v-if="prod.color.length>1">
                                        Color:
                                        <select class="w-auto text-capitalize font-weight-bold rounded" v-model="prod.colorSelected">
                                            <option v-for="col in prod.color" :key="col" :value="col" class="text-capitalize">{{col}}</option>
                                        </select>
                                    </div>
                                    <div class="text-capitalize" v-else>
                                        Color: <b>{{prod.color[0]}}</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-text row mx-auto mb-2 px-2 col-12">
                        <div class="btn link col text-light mx-1 bg-success" @click.prevent="addCart(prod, 'min')">
                            {{prod.min.long}} mts. ${{toFloat(prod.min.price)}}
                            <br>
                            <span class="material-icons align-middle" >add_shopping_cart</span>
                        </div>
                        <div class="btn link col text-light mx-1 bg-success" @click.prevent="addCart(prod, 'max')">
                            {{prod.max.long}} mts. ${{toFloat(prod.max.price)}}
                            <br>
                            <span class="material-icons align-middle" >add_shopping_cart</span>
                        </div>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';

var foto = false;
export default {
    name: "Products",
    data(){
        return{
            cart:[],
            cat: 'todos',
            productsShow: [],
            inputProduct: false,
            state: '',
            form:{
                code: '',
                name: '',
                width: 0,
                color:[],
                min:{
                    long: 0,
                    price:  0
                },
                max:{
                    long: 0,
                    price:  0
                },
                id:" ",
                category:[],
                image: {
                    url: null,
                    path: null
                }
            },
            tempForm:null,
            tempColor:'',
            tempCategory:'',
            tempImage: null,
            hasName: false,
            progress: 0,
            edit: false
        }
    },
    props:['products','cartTop','categoryList','colorList','user'],
    mounted() {
        this.getProducts('todos');      
    },
    methods:{
        deleteProduct(){
            if(confirm("Deseas borrar ese producto?")){
                var id = this.form.id;
                firebase.firestore().collection("products").doc(id).delete();
                this.cancelEdit();
            }
        },
        editProduct(prod){
            if(!this.edit){
                this.tempForm = this.form;
            }
            this.edit = true
            this.form = {
                code: prod.code,
                name: prod.name,
                width: prod.width,
                color: prod.color,
                min:{
                    long: prod.min.long,
                    price:  prod.min.price
                },
                max:{
                    long: prod.max.long,
                    price:  prod.max.price
                },
                id: prod.id,
                category: prod.category,
                image: {
                    url: null,
                    path: null
                }
            };
            if(prod.image.url){
                this.form.image.url = prod.image.url;
                this.form.image.path = prod.image.path;
            }
        },
        cancelEdit(){
            this.edit = false
            this.form = this.tempForm;
        },
        updatePhoto(event){
            foto = true;
            this.tempImage = event.target.files[0];
        },
        uploadPhoto(){
            var task = firebase.storage().ref('products/'+ this.tempImage.name).put(this.tempImage);
            let urlFir = null;
            task.on("state_changed", snapshot => {
                let percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                this.progress = percentage;
            }, error => {console.log(error.message)},()=>{
                task.snapshot.ref.getDownloadURL().then((url)=>{
                    urlFir = url
                    console.log(urlFir)
                    this.form.image.url = urlFir;
                    this.form.image.path = 'products/' + this.tempImage.name;
                    this.uploadProduct();
                })
            });
        },
        uploadProduct(){
            console.log("Prod: ", this.form)
            if(!this.edit){
                var ubi = firebase.firestore().collection("products").doc();
                this.form.id = ubi.id;
                ubi.set(this.form);
            }else{
                console.log(this.form)
                firebase.firestore().collection("products").doc(this.form.id).set(this.form)
            }
            this.form = {
                code: '',
                name: '',
                width: 0,
                color:[],
                min:{
                    long: 0,
                    price:  0
                },
                max:{
                    long: 0,
                    price:  0
                },
                id:" ",
                category:[],
                image: {
                    url: null,
                    path: null
                }
            }
        },
        publish(){
            if(this.valProd() && !this.edit){
                this.uploadPhoto();
            }
        },
        lower(value){
            if(typeof value == 'string'){
                return value.toLowerCase();
            }
        },
        valEdit(){
            if(!this.valNum(this.form.min.long)){
                this.state = '\nRevisa el largo del rollo pequeño';  
                return false
            }else if(!this.valNum(this.form.min.price)){
                this.state = '\nRevisa el precio del rollo pequeño';   
                return false
            }else if(!this.valNum(this.form.max.long)){
                this.state = '\nRevisa el largo del rollo grande';    
                return false
            }else if(!this.valNum(this.form.max.price)){
                this.state = '\nRevisa el precio del rollo grande';    
                return false
            }else{
                this.state = ' '
                return true
            }
        },
        valProd(){
            if(!this.valNameCode(this.form.code, 'code')){
                this.state = 'Revisa el código';    
                return false
            }else if(this.hasName && !this.valNameCode(this.form.name, 'name')){
                this.state = '\nRevisa el nombre'; 
                return false
            }else if(!this.valNum(this.form.width)){
                this.state = '\nRevisa el ancho'; 
                return false
            }else if(!this.valStrArr(this.form.color)){
                this.state = '\nAgrega un color';
                return false
            }else if(!this.valStrArr(this.form.category)){
                this.state = '\nAgrega una categoría';  
                return false
            }else if(!this.valNum(this.form.min.long)){
                this.state = '\nRevisa el largo del rollo pequeño';  
                return false
            }else if(!this.valNum(this.form.min.price)){
                this.state = '\nRevisa el precio del rollo pequeño';   
                return false
            }else if(!this.valNum(this.form.max.long)){
                this.state = '\nRevisa el largo del rollo grande';    
                return false
            }else if(!this.valNum(this.form.max.price)){
                this.state = '\nRevisa el precio del rollo grande';    
                return false
            }else if(!foto || this.edit){
                this.state = '\nAgrega una imagen';    
                return false
            }else{
                this.state = ''
                return true
            }
        },
        valNum(num){
            return num>0;
        },
        valStrArr(str){
            return str.length>0;
        },
        valNameCode(data, type){
            return data.length>0 && this.products.findIndex(prod => prod[type] == data)==-1;
        },
        addCategory(){
            if(this.tempCategory.length>0){
                var index = this.form.category.indexOf(this.tempCategory);
                if(index==-1){
                    this.form.category.push(this.tempCategory);
                }else{
                    this.form.category.splice(index,1)
                }
                this.tempCategory = null;
            }
        },
        addColor(){
            if(this.tempColor.length>0){
                var index = this.form.color.indexOf(this.tempColor);
                if(index==-1){
                    this.form.color.push(this.tempColor);
                }else{
                    this.form.color.splice(index,1)
                }
                this.tempColor = '';
            }
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
        addCart(prod, button){
            this.cart = this.cartTop;
            var prodTemp ={
                name: null,
                code: prod.code,
                width: prod.width,
                color: prod.colorSelected,
                long: prod[button].long,
                price: prod[button].price,
                image: prod.image.url,
                quantity:1
            };
            if(prod.name){
                prodTemp.name = prod.name
            }
            var index = this.findIndex(prodTemp);
            if(index==-1){ 
                prodTemp.quantity = 1;
                this.cart.push(prodTemp);
            }else{
                this.cart[index].quantity += 1;
            }
            this.$emit('cartUpdate', this.cart)
        },
        findIndex(prod){
            return this.cart.findIndex(prodTemp => prod.code == prodTemp.code && prod.long == prodTemp.long && prod.color == prodTemp.color)
        },
        getProducts(cat){
            this.cat = cat;
            this.productsShow=[];
            this.productsShow = this.products.filter(prod => cat=='todos' || prod.category.indexOf(cat)!=-1)
            this.productsShow.sort(function(a, b){
                if(a.code<b.code){
                    return -1;
                }else if(a.code>b.code){
                    return 1;
                }else{
                    return 0;
                }
            })
        }
    }
}
</script>

<style scoped>
.sticky-top{
    position: -webkit-sticky;
    position: sticky;
    top: 58px;
    z-index: 1001;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>