<template>
  <div>
    <h1>Hello {{ user.name }}!</h1>
    <p>password:{{ user.password }}</p>
    <p>computed-password:{{ newPassword }}</p>
    <p>父组件传值foo:{{ foo }}</p>
    <button @click="handler">watch</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { computed, ref, toRefs } from '@vue/runtime-core'

export default defineComponent({
  props: {
    foo: {
      type: String,
      default: '',
      required: true,
    },
  },
  setup() {
    const user = ref({} as User)
    user.value = {
      name: 'vue3',
      password: 'hlj123',
    }

    const handler = () => {
      user.value.password = '123456'
      console.log(user.value)
    }

    const newPassword = computed(() => {
      console.log('watch')
      return user.value.password
    })

    return {
      user,
      newPassword,
      handler,
    }
  },
})
</script>

<style></style>
