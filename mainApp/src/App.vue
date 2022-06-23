<template>
  <div class="micro-wrap">
    <router-view />
    <div class="change-buttons">
      <img class="icon" src="@/assets/setting.png" alt="">
      <a-button type="primary" class="btn" @click="changePage('/lowcode')">lowcode</a-button>
      <a-button type="primary" class="btn" @click="changePage('/poi')">poi</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'

const router = useRouter()
const route = useRoute()

function changePage(page: string) {
  router.push(page)
}

</script>

<style lang="less" scoped>
.micro-wrap {
  .change-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 10000;
    top: 50vh;
    right: -162px;
    //background-color: #fff;
    transition-duration: 300ms;
    &:hover {
      right: 0;
    }
    .icon {
      width: 50px;
      height: 50px;
    }
    .btn {
      width: 80px;
      height: 30px;
      margin-left: 2px;
    }
  }
}
</style>
