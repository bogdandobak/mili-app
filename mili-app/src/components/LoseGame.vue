<template>
  <div class="flex flex-col gap-4">
    <h2>
      You lose the game
    </h2>
    <p>Your score: {{ score }}</p>
    <button
      class="bg-purple-500 hover:bg-purple-700 text-white font-bold p-3 rounded w-32"
      @click="handleRestart"
    >
      Restart quiz
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoseGame',
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
