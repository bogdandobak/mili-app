<template>
  <button
    v-if="!link"
    class="bg-purple-400 hover:bg-purple-700 text-white text-center font-bold p-3 rounded w-32 transition-colors"
    @click="handleButton"
  >
    <slot />
  </button>
  <router-link
    v-else
    class="bg-purple-400 hover:bg-purple-700 text-center text-white font-bold p-3 rounded w-32 transition-colors"
    :to="link"
    @click="handleButton"
  >
    <slot />
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseButton',
  props: {
    handleButton: {
      type: Function,
      required: false,
      default: null
    },
    link: {
      type: String,
      required: false,
      default: ''
    }
  }
})
</script>
