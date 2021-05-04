<template>
  <div class="flex flex-col item-center gap-4">
    <h2 class="text-center text-purple-600 font-semibold">You win the game</h2>
    <p class="text-center text-purple-600 font-semibold">Your score: {{ score }}</p>
    <BaseButton :handleButton="handleRestart">
      Try again
    </BaseButton>
  </div>
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
