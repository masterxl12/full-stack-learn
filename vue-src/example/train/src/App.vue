<template>
  <div id="app">
    <Parent />
    <br />
    store.state ----- {{ $store.state.age }}
    <br />
    store.getters -----
    {{ $store.getters.getAge }}
    <br />
    store.getters -----
    {{ $store.getters.getAge }}
    <br />
    store.getters -----
    {{ $store.getters.getAge }}
    <br />
    <button @click="changeSync">同步修改</button>
    <button @click="changeASync">异步修改</button>
    <router-view />
  </div>
</template>

<script>
import Parent from "./components/Parent.vue";

export default {
  name: "app",
  components: { Parent },
  methods: {
    changeSync() {
      this.$store.commit("changeAge", 10);
    },
    changeASync() {
      this.$store.dispatch("changeAgeAsync", 100);
    },
  },
  mounted() {
    console.log(this.$store, "app vue...");
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
