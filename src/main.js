import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VantGreen from 'vant-green';
import 'vant-green/lib/index.css';
import { List } from 'vant-green';

import "./common/rem";

Vue.config.productionTip = false;

Vue.use(VantGreen);
Vue.use(List);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
