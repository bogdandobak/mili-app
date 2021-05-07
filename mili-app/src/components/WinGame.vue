<template>
  <div class="flex flex-col item-center gap-4">
    <h2 class="text-center text-white font-semibold">You win the game</h2>
    <p class="text-center text-white font-semibold">Your score: {{ score }}</p>
    <BaseButton :handleButton="sendData">
      Save your result
    </BaseButton>
    <BaseButton link="/">
      Home
    </BaseButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { sendScore } from '@/api/api'
import { localStorageService } from '@/services/localStorageService'

export default defineComponent({
  name: 'WinGame',
  props: {
    score: {
      type: Number,
      required: true
    }
  },
  setup () {
    function sendData () {
      const newUser = {
        name: `User ${+new Date()}`,
        score: localStorageService.getItem('score')
      }
      sendScore(newUser)
    }

    return {
      sendData
    }
  }
})
</script>
