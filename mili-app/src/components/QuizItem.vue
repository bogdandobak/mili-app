<template>
  <li
    v-for="(item, index) in answers"
    :key="item.variant"
    class="background m-2 w-72 text-white text-center rounded-md
          hover:bg-purple-700 transition-colors duration-1000"
    :class="item.isCorrect ? correctAnswerText : correctAnswerText && falseAnswerText"
    @click="handleAnswer(index, event)"
  >
    {{ item.variant }}: {{ item.text }}
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { IAnswer } from '@/modules/IAnswer'

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
    const correctAnswerText = ref('')
    const falseAnswerText = ref('')

    function handleAnswer (itemIndex: number) {
      const answerData = props.answers.find((_, index) => index === itemIndex)

      if (answerData?.isCorrect) {
        correctAnswerText.value = 'text-green-700 pointer-events-none'
        setTimeout(() => {
          emit('handle-score')
        }, 1000)
      } else {
        correctAnswerText.value = 'text-green-700 pointer-events-none'
        falseAnswerText.value = 'text-red-700 pointer-events-none'
        setTimeout(() => {
          emit('handle-incorrect-answer')
        }, 1000)
      }
      setTimeout(() => {
        emit('switch-question')
        correctAnswerText.value = ''
        falseAnswerText.value = ''
      }, 500)
    }

    return {
      handleAnswer,
      correctAnswerText,
      falseAnswerText
    }
  }
})
</script>

<style scoped>
.background {
  background: url(https://wwbm.com/images/quest.png);
  background-position: center;
  background-size: 400px;
}
</style>
