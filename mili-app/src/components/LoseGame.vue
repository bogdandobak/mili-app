<template>
  <div class="flex flex-col gap-4 items-center">
    <h2 class="text-center text-white font-semibold">
      You lose the game
    </h2>
    <p class="text-center text-white font-semibold">Your score: {{ score }}</p>
    <BaseButton :handleButton="handleRestart">
      Restart game
    </BaseButton>
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
