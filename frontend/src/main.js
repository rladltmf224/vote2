import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import { store } from "./store";
import VueCryptojs from 'vue-cryptojs'
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios; //전역변수로 설정 컴포넌트에서 this.$axios 호출할 수 있음
Vue.use(VueCryptojs)
Vue.$cookies.config("7d");

new Vue({
  router,
  store: store,
  render: (h) => h(App)
}).$mount('#app');
