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
</script>

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
