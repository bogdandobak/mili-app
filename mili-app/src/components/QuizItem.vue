<template>
  <li
    v-for="(item, index) in answers"
    :key="item.variant"
    class="m-2 w-72 border-2 text-white bg-purple-400 rounded-md
          hover:bg-purple-700 hover:text-white transition-colors duration-1000"
    :class="item.isCorrect ? correctAnswerBorder : correctAnswerBorder && falseAnswerBorder"
    @click="handleAnswer(index)"
  >
    {{ item.variant }}: {{ item.text }}
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { IAnswer } from '@/modules/IAnswer'

export default defineComponent({
  props: {
    answers: {
      type: Array as PropType<IAnswer[]>,
      required: true
    },
    switchQuestion: {
      type: Function,
      required: true
    },
    handleScore: {
      type: Function,
      required: true
    },
    handleIncorrectAnswer: {
      type: Function,
      required: true
    }
  },
  emits: ['handle-answer'],
  setup (props) {
    const correctAnswerBorder = ref('')
    const falseAnswerBorder = ref('')
    function handleAnswer (itemIndex: number) {
      const answerData = props.answers.find((_, index) => index === itemIndex)

      if (answerData?.isCorrect) {
        correctAnswerBorder.value = 'border-green-600'
        setTimeout(() => {
          props.switchQuestion()
          props.handleScore()
        }, 1000)
      } else {
        correctAnswerBorder.value = 'border-green-600'
        falseAnswerBorder.value = 'border-red-600'
        setTimeout(() => {
          props.handleIncorrectAnswer()
          props.switchQuestion()
        }, 1000)
      }
      setTimeout(() => {
        correctAnswerBorder.value = ''
        falseAnswerBorder.value = ''
      }, 500)
    }

    return {
      handleAnswer,
      correctAnswerBorder,
      falseAnswerBorder
    }
  }
})
</script>
