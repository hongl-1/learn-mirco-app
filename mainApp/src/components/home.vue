<template>
  <div>
    <button @click="changePage('/lowcode')">lowcode</button>
    <button @click="changePage('/poi')">poi</button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function changePage(page) {
  router.push(page)
}
</script>
