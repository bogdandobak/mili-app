<template>
  <h1 class="font-bold text-xl text-white text-center">
    Welcome to the Game
  </h1>
  <p class="text-center text-white font-semibold">
    In this game, you will face very hard questions. Good luck
  </p>
  <BaseButton :handleButton="handleStart">
    Start game
  </BaseButton>
  <Leaderboard />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Leaderboard from '@/components/Leaderboard.vue'

export default defineComponent({
  name: 'WelcomeQuiz',
  components: {
    Leaderboard
  },
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
