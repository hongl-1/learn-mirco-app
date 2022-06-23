<template>
  <div class="vite">
    <micro-app
      name='poi'
      :url='getUrl()'
      inline
      disableSandbox
    >
      <!-- destroy inline scopecss='false' -->
    </micro-app>
  </div>
</template>

<script lang="ts" setup>
import { isUserPage } from '@/utils'

function getUrl () {
  let url = ''
  if (import.meta.env.DEV) {
    url = 'http://localhost:5004/'
  } else {
    url = 'http://poiback.lishicloud.com/'
  }
  return isUserPage() ? url + 'pages/index.html' : url + 'pages/user.html'
}
</script>

<style>
</style>
