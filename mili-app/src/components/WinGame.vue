<template>
  <h2>You win the game</h2>
  <p>Your score: {{ score }}</p>
  <button @click="handleRestart">Try again</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'WinGame',
  props: {
    score: {
      type: Number,
      required: true
    }
  },
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
