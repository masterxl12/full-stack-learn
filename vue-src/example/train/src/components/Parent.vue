<template>
  <div class="hello">
    <Child v-model="info" :msg="msg" />
  </div>
</template>

<script>
import Child from "./Child.vue";

export default {
  name: "Parent",
  data() {
    return {
      msg: "xl",
      info: {
        name: "zs",
        age: 20,
      },
    };
  },
  methods: {
    changeHandler(msg) {
      this.msg = msg;
    },
  },
  components: { Child },
};
</script>

<style scoped>
</style>
