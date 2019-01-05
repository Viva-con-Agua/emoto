import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Emoto from './Emoto.vue';
import router from './router';

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  render: h => h(Emoto),
  router
}).$mount('#app')
