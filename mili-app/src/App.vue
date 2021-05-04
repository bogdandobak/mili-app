<template>
  <div
    v-if="!isGameStarted"
    class="flex flex-col items-center gap-5 m-5"
  >
    <WelcomeQuiz @handle-start="handleStart" />
  </div>
  <div v-else>
    <Quiz />
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineComponent, ref } from 'vue'
import Quiz from '@/components/Quiz.vue'
import WelcomeQuiz from '@/components/WelcomeQuiz.vue'

export default defineComponent({
  name: 'App',
  components: {
    Quiz,
    WelcomeQuiz
  },
  setup () {
    const isGameStarted = ref(JSON.parse(localStorage.getItem('isGameStarted')!) || false)
    function handleStart () {
      localStorage.setItem('isGameStarted', JSON.stringify(true))
      isGameStarted.value = JSON.parse(localStorage.getItem('isGameStarted')!)
    }

    return {
      isGameStarted,
      handleStart
    }
  }
})
</script>
