<template>
  <div class="hello">
    <HTag :tagType="type">{{ msg }}</HTag>
    <HTag :tagType="2">{{ msg }}</HTag>
    <HTag :tagType="3">{{ msg }}</HTag>
    <HTag :tagType="4">{{ msg }}</HTag>
    <HTag :tagType="5">{{ msg }}</HTag>
  </div>
</template>

<script>
import { HTag } from "./Tag.jsx";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      type: 1,
    };
  },
  components: { HTag },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
