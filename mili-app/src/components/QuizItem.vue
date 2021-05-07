<template>
  <li
    v-for="(item, index) in answers"
    :key="item.variant"
    class="m-2 w-72 border-2 text-white bg-purple-400 rounded-md
          hover:bg-purple-700 hover:text-white transition-colors duration-1000"
    :class="item.isCorrect ? correctAnswerBorder : correctAnswerBorder && falseAnswerBorder"
    @click="handleAnswer(index, event)"
  >
    {{ item.variant }}: {{ item.text }}
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { IAnswer } from '@/modules/IAnswer'
// import { localStorageService } from '@/services/localStorageService'

export default defineComponent({
  name: 'QuizItem',
  props: {
    answers: {
      type: Array as PropType<IAnswer[]>,
      required: true
    }
  },
  emits: ['switch-question', 'handle-score', 'handle-incorrect-answer'],
  setup (props, { emit }) {
    const correctAnswerBorder = ref('')
    const falseAnswerBorder = ref('')

    function handleAnswer (itemIndex: number) {
      const answerData = props.answers.find((_, index) => index === itemIndex)

      if (answerData?.isCorrect) {
        correctAnswerBorder.value = 'border-green-600 pointer-events-none'
        setTimeout(() => {
          emit('handle-score')
        }, 1000)
      } else {
        correctAnswerBorder.value = 'border-green-600 pointer-events-none'
        falseAnswerBorder.value = 'border-red-600 pointer-events-none'
        setTimeout(() => {
          emit('handle-incorrect-answer')
        }, 1000)
      }
      setTimeout(() => {
        emit('switch-question')
        correctAnswerBorder.value = ''
        falseAnswerBorder.value = ''
      }, 800)
    }

    return {
      handleAnswer,
      correctAnswerBorder,
      falseAnswerBorder
    }
  }
})
</script>
