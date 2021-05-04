<template>
  <button
    class="bg-purple-500 hover:bg-purple-700 text-white font-bold p-3 rounded w-32"
    @click="handleButton"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    handleButton: {
      type: Function,
      required: true
    }
  }
})
</script>
