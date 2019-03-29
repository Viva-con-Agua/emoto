import Vue from 'vue';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Emoto from './Emoto.vue';
import router from './router';
import store from './store';

Vue.use(ElementUI);
Vue.use(Vuex);
Vue.config.productionTip = false

new Vue({
  render: h => h(Emoto),
  router,
  store
}).$mount('#app')
