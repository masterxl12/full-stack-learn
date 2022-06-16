<template>
  <div>
    <p>child-{{ value.name }}</p>
    <button @click="inputChange">changed...</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: {},
      required: true,
    },
  },
  data() {
    return {
      type: 1,
    };
  },
  methods: {
    inputChange() {
      this.$emit("input", { name: "haha", age: 30 });
    },
  },
};
</script>

<style>
</style>