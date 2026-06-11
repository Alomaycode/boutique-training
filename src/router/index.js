import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import CartView from "../views/CartView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
  
