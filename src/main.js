import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/css/style.css'
import './assets/css/navbar.css'
import './assets/css/product-card.css'
import './assets/css/product-detail.css'
import './assets/css/home.css'
import './assets/css/footer.css'
import './assets/css/cart.css'
import App from './App.vue'
import router from './router'



createApp(App).use(router).use(createPinia()).mount('#app')
