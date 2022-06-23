<template>
  <div>
    <img class="icon" src="@/assets/setting.png" alt="" :draggable="true" />
    <button @click="changePage('/lowcode')" :draggable="true">lowcode</button>
    <button @click="changePage('/poi')" :draggable="true">poi</button>
  </div>
</template>
