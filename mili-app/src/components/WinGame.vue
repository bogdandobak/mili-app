<template>
  <h2>You win the game</h2>
  <button @click="handleRestart">Try again</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'WinGame',
  emits: ['handle-restart'],
  setup (_, { emit }) {
    function handleRestart () {
      emit('handle-restart')
    }

    return {
      handleRestart
    }
  }
})
</script>
