<template>
  <h1 class="font-bold text-xl text-white text-center">
    Welcome to the Game
  </h1>
  <p class="text-center text-white font-semibold">
    In this game, you will face very hard questions. Good luck
  </p>
  <BaseButton link="/quiz">
    Start game
  </BaseButton>
  <BaseButton
    link="/leaderboard"
  >
    Leaderboard
  </BaseButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WelcomeQuiz',
  emits: ['handle-start'],
  setup (_, { emit }) {
    function handleStart () {
      emit('handle-start')
    }

    return {
      handleStart
    }
  }
})
</script>
