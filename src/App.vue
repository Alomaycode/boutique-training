<script setup>
//import HelloWorld from './components/HelloWorld.vue'
import {RouterView} from 'vue-router'
import Navbar from './components/NavBar.vue'
import Footer from './components/footer.vue'
</script>

<template>
  <Navbar />
  <RouterView />
  <Footer />
</template>
