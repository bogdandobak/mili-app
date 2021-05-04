<template>
  <h1 class="font-bold text-xl text-purple-700 text-center">
    Welcome to quiz
  </h1>
  <p class="text-center text-purple-600 font-semibold">
    In this quiz, you will face very hard questions. Good luck
  </p>
  <BaseButton :handleButton="handleStart">
    Start quiz
  </BaseButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
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
