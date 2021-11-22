import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Vuetify from 'vuetify'


Vue.config.productionTip = false
Vue.use(Vuetify)

axios.defaults.baseURL = "http://localhost:8000"

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
