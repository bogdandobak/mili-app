<template>
  <div class="flex flex-col gap-10">
    <h2>
      You lose the game
    </h2>
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
