// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'
import VueResource from 'vue-resource'
import  { ToastPlugin } from 'vux'
import VueClipboard from 'vue-clipboard2'


FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.use(VueResource);
Vue.use(VueClipboard)

// 默认参数
Vue.use(ToastPlugin);

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
