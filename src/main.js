import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import BuyModalComponent from '@/components/Shared/BuyModal'
import * as fb from 'firebase'

Vue.config.productionTip = false
Vue.component('app-buy-modal', BuyModalComponent)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created() {
    fb.initializeApp({
      apiKey: 'AIzaSyDkRkdX5hRx37t9Sd0zUzQPW386-FnXQV4',
      authDomain: 'vue-work-js.firebaseapp.com',
      databaseURL: 'https://vue-work-js.firebaseio.com',
      projectId: 'vue-work-js',
      storageBucket: 'vue-work-js.appspot.com',
      messagingSenderId: '222692072025',
      appId: '1:222692072025:web:b7b43cd347706fc791ef48'
    })

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
}).$mount('#app')
