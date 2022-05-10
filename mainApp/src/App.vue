<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
function changePage(page) {
  router.push(page)
}
</script>

<template>
  <button @click="changePage('/vueVite')">vueVite</button>
  <button @click="changePage('/vue2Webpack')">vue2Webpack</button>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
