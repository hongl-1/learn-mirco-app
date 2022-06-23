<template>
  <div class="lowcode">
    <micro-app
      name='lowcode'
      :url='getUrl()'
      baseroute='/lowcode'
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
    url = 'http://localhost:8026/'
  } else {
    url = 'https://lowcode.test.lishicloud.com/'
  }
  return isUserPage() ? url + 'preview.html' : url
}
</script>

<style>
</style>
