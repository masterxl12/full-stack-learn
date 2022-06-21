<template>
  <div>
    <HelloWorld message="123" />
    <img src="./assets/avatar.jpg" />
    <img :src="imgUrl" />
    <div :class="style.wrapper">
      <p>wrapper</p>
      <div :class="style.inner">
        <p>inner</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import imgUrl from "./assets/avatar.jpg";
import style from "./styles/style.module.less";
console.log(123);
</script>

<style></style>
