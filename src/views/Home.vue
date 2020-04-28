<template>
    <div>
        <div class="container-fluid mx-0 px-0">
            <img class="col px-0 d-block d-sm-block d-md-none" src="../assets/BannerCELU.jpg" alt="">
            <img class="col px-0 d-none d-sm-none d-md-block" src="../assets/BannerPC.jpg" alt="">
        </div>
        <div class="container text-center py-3">
            <hr class="w-50">
            <h2><b>- Ludetex, nosotros y vos -</b></h2>
            <hr class="w-50">
            <p class="pb-0 mb-0"><b>LUDETEX</b> es una empresa fundada en el año <b>2009</b>. En medio de conflictos políticos, sociales y económicos, no fue fácil la decisión de comprar inmuebles, tomar personal calificado e invertir en maquinarias de última tecnología y de mayor prestigio en el mercado como es la marca <b>“COMEZ”</b>; pero lo hicimos con la firme convicción de apostar a este país y hacerlo a través de una pasión que nos fue inculcada desde hace muchos años:</p>
            <b class="text-center">“LA PASION POR LA INDUSTRIA TEXTIL”.</b>
            <hr class="w-50">
        </div>
        <div class="container-fluid row mx-auto">
            <img class="col-md-4 col-sm-12 pb-sm-3 py-md-0" src="../assets/p6.jpg" alt="">
            <img class="col-md-4 col-sm-12 py-sm-3 py-md-0" src="../assets/p2.jpg" alt="">
            <img class="col-md-4 col-sm-12 pt-sm-3 py-md-0" src="../assets/p7.jpg" alt="">
        </div>  
        <div class="container text-center py-3">
            <hr class="w-50">
            <h2><b>- Historia -</b></h2>
            <hr class="w-50">
            <p class="pb-0 mb-0">Si bien no tenemos un pasado en la fabricación de puntillas y elásticos, no somos improvisados, los casi <b>50 años en la producción de cintas textiles</b> como 
            <a class="p-0" href="http://www.cintasmalbo.com.ar/" target="_blank">
                <b>“CINTAS MALBO”</b>
            </a>, nos hicieron adquirir la experiencia suficiente para afrontar este desafío que estamos empezando a recorrer junto con nuestro mayor capital: <b>“NUESTROS CLIENTES”</b>. Es por todo esto que no podemos hablar de trayectoria de LA EMPRESA, pero si podemos hablar del futuro y la proyección de LUDETEX, que está afianzada en las bases del trabajo, la responsabilidad y la atención personalizada a todos nuestros clientes.</p>
            <hr class="w-50">
        </div>
        <div class="container mx-auto text-center py-3">
            <hr class="w-50">
            <h2><b>- Métricas -</b></h2>
            <hr class="w-50">
            <div class="row container mx-auto">
                <div class="col-lg col-sm-12 text-center py-3 mx-5 mb-2 border-info custom-border">
                    <div class="count">
                        -
                        <ICountUp
                            class="font-weight-bold"
                            :delay="delay"
                            :endVal="endVal.clients"
                            :options="options"
                        />
                        -
                    </div>
                    <p class="col font-weight-bold mb-0">Clientes satisfechos</p>
                </div>
                <div class="col-lg col-sm-12 text-center py-3 mx-5 mb-2 border-info custom-border">
                    <div class="count">
                        -
                        <ICountUp
                            class="font-weight-bold"
                            :delay="delay"
                            :endVal="endVal.years"
                            :options="options"
                        />
                        -
                    </div>
                    <p class="col font-weight-bold mb-1">Años de experiencia</p>
                </div>
                <div class="col-lg col-sm-12 text-center py-3 mx-5 border-info custom-border">
                    <div class="count">
                        -
                        <ICountUp
                            class="font-weight-bold"
                            :delay="delay"
                            :endVal="endVal.rolls"
                            :options="options"
                        />
                        -
                    </div>
                    <p class="col font-weight-bold mb-0">Rollos realizados</p>
                </div>
            </div>
            <hr class="w-50">
        </div>  
        <div class="container text-center py-3">
            <hr class="w-50">
            <h2><b>- Capacidades -</b></h2>
            <hr class="w-50">
            <p class="pb-0 mb-0">Contamos con un departamento especialmente preparado para atender las inquietudes de nuestros clientes en cuanto a diseños de productos. Contamos con gente especializada para transformar bosquejos, ilustraciones e ideas abstractas en productos terminados. Además, por sentir esto como un principio fundamental en la empresa, no exigimos cantidades excesivas para la realización de un producto puntual o para la utilización de distintos tipos de hilados. En tal sentido ya hemos desarrollado productos exclusivos en <b>RAYON, POLIPROPILENO, YUTE, ACETATO y combinaciones especiales</b>.</p>
            <hr class="w-50">
        </div>
        <div class="container-fluid row mx-auto">
            <img class="col-md-6 col-sm-12 pb-sm-3 py-md-0" src="../assets/p4.jpg" alt="">
            <img class="col-md-6 col-sm-12 pt-sm-3 py-md-0" src="../assets/p3.jpg" alt="">
        </div>  
        <div class="container text-center py-3" id="Contacto">
            <hr class="w-50">
            <h2><b>- Contacto -</b></h2>
            <hr class="w-50">
            <div class="col my-2">
                Dirección: <a href="https://goo.gl/maps/m3TjSWsYXzPVZ2rw7" target="_blank">Pola 2249, Ciudad Autonoma de Buenos Aires</a>
            </div>
            <div class="col my-2">
                Telefono: <a href="tel:4682-3838" target="_blank">4682-3838</a> - <a href="tel:4682-3793">4682-3793</a>
            </div>
            <div class="col my-2">
                Email: <a href="mailto:info@ludetex.com.ar" target="_blank">info@ludetex.com.ar</a>
            </div>
        </div>
    </div>
</template>
<script>
// import $ from 'jquery'
import ICountUp from 'vue-countup-v2';

export default {
    name: 'Home',
    components: {
      ICountUp
    },
    props:['mobile'],
    data(){
        return{
            options: {
                useEasing: true,
                useGrouping: true,
                separator: '.',
                decimal: ',',
                prefix: '',
                suffix: ''
            },
            delay:2000,
            endVal:{
                clients: 33000,
                rolls: 1550000,
                years: 50
            }
        }
    },
}
</script>

<style scoped>
.custom-border{
    border: 2px solid red;
    border-radius: 50px;
}
.count{
    font-size: 30px;
}
</style>