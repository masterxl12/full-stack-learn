<template>
  <MyFirstVue :foo="parentFoo.foo" />
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/runtime-core'

import MyFirstVue from './MyFirst.vue'

export default defineComponent({
  components: {
    MyFirstVue,
  },
  setup() {
    const parentFoo = reactive({
      foo: 'parent---foo',
    })
    return {
      parentFoo,
    }
  },
})
</script>
