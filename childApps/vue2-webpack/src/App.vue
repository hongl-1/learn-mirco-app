<template>
  <div id="app">
    Vue2Webpack
    <button @click="getGlobalData">获取全局数据</button>
    <button @click="getData">获取定向数据</button>
    <!--<router-view/>-->
  </div>
</template>

<script>
export default {
  methods: {
    getGlobalData() {
      console.log('vue2Webpack-getGlobalData:', window.microApp.getGlobalData())
    },
    getData() {
      console.log('vue2Webpack-getData:', window.microApp.getData())
    },

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
