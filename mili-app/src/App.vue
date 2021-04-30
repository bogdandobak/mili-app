<template>
  <div>
    <h1 class="m-5 font-bold text-xl text-purple-700 text-center">
      Welcome to quiz
    </h1>
    <Quiz />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Quiz from '@/components/Quiz.vue'

export default defineComponent({
  components: {
    Quiz
  }
})
</script>
