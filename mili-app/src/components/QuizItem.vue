<template>
  <li
    v-for="item in answers"
    :key="item.text"
    class="m-2 w-72 border-2 text-purple-500 rounded-md
          hover:bg-purple-400 hover:text-white transition-colors duration-1000"
    :class="item.isCorrect ? correctAnswerBorder : correctAnswerBorder && falseAnswerBorder"
    @click="handleAnswer(item.text)"
  >
    {{ item.text }}
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IAnswer } from '@/modules/IAnswer'

export default defineComponent({
  props: {
    answers: {
      type: Array as PropType<IAnswer[]>,
      required: true
    },
    correctAnswerBorder: {
      type: String,
      required: true
    },
    falseAnswerBorder: {
      type: String,
      required: true
    }
  },
  emits: ['handle-answer'],
  setup (_, { emit }) {
    function handleAnswer (text: string) {
      emit('handle-answer', text)
    }

    return {
      handleAnswer
    }
  }
})
</script>
