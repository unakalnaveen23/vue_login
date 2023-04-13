import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from '../node_modules/vuetify/dist/vuetify.min.css'
import Toaster from "@meforma/vue-toaster";
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'


createApp(App).use(VueChartkick).use(Vuetify).use(Toaster).use(router).mount('#app')
