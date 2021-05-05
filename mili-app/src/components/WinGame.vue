<template>
  <div class="flex flex-col item-center gap-4">
    <h2 class="text-center text-white font-semibold">You win the game</h2>
    <p class="text-center text-white font-semibold">Your score: {{ score }}</p>
    <BaseButton :handleButton="sendData">
      Save your result
    </BaseButton>
    <BaseButton :handleButton="handleRestart">
      Try again
    </BaseButton>
    <BaseButton link="/">
      Home
    </BaseButton>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineComponent } from 'vue'
import { sendScore } from '@/api/api'

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

    function sendData () {
      const newUser = {
        name: `User ${+new Date()}`,
        score: +localStorage.getItem('score')!
      }
      sendScore(newUser)
    }

    return {
      handleRestart,
      sendData
    }
  }
})
</script>
