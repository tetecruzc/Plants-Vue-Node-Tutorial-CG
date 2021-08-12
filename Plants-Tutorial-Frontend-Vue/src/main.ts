import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Vuelidate from 'vuelidate';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { EnvironmentConstants } from './constants/enviromentConstants'
import VueSocketIOExt from 'vue-socket.io-extended';
import  io  from 'socket.io-client';
import dotenv from 'dotenv';


const socket = io(EnvironmentConstants.SOCKET_HOST);

dotenv.config();
Vue.use(Vuelidate)
Vue.use(VueToast, {
  position: 'top',
  duration: 4000
});
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false

Vue.use(VueSocketIOExt, socket);
Vue.$toast.clear();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
