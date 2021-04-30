<template>
  <section class="flex flex-col items-center">
    <div v-if="!isGameOver">
      <h2 class="text-center font-semibold text-md">
        {{ questionsData[currentQuestionIndex].question }}
      </h2>
      <button @click="handleHint">
        50 / 50
      </button>
      <a
        :href="`https://www.google.com/search?q=${questionsData[currentQuestionIndex].question}`"
        target="_blank"
        @click="handleHint"
      >
        Search in google
      </a>
      <div class="flex w-full justify-center p-10">
        <ul>
          <li
            v-for="item in questionsData[currentQuestionIndex].answers"
            :key="item.text"
            class="m-2 w-72 border-2 rounded-md hover:bg-purple-400 transition-colors duration-1000"
            :class="item.isCorrect ? correctAnswerBorder : correctAnswerBorder && falseAnswerBorder"
            @click="handleAnswer(item.text)"
          >
            {{ item.text }}
          </li>
        </ul>
      </div>
    </div>
    <LoseGame
      v-else
      @handle-restart="handleRestart"
    />
  </section>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineComponent, ref } from 'vue'
import LoseGame from '@/components/LoseGame.vue'
import questions from '@/data/questions.json'
import { IQuestion } from '@/modules/IQuestion'

export default defineComponent({
  components: {
    LoseGame
  },
  setup () {
    const questionsData = ref<IQuestion[]>(questions)
    const currentQuestionIndex = ref(+localStorage.getItem('index')! || 0)
    const isGameOver = ref(false)
    const correctAnswerBorder = ref('')
    const falseAnswerBorder = ref('')
    const savedAnswers = ref<IQuestion[]>([])
    const searchCanUseTimes = ref(2)
    const halfCanUseTimes = ref(2)

    function saveAsnwer () {
      savedAnswers.value.push(questionsData.value[currentQuestionIndex.value])
      localStorage.setItem('answers', JSON.stringify(savedAnswers))
    }

    function handleAnswer (answer: string) {
      const answerData = questionsData.value[currentQuestionIndex.value].answers.find(item => item.text === answer)

      if (answerData?.isCorrect) {
        saveAsnwer()
        correctAnswerBorder.value = 'border-green-600'
        setTimeout(() => {
          localStorage.setItem('index', JSON.stringify(currentQuestionIndex.value + 1))
          currentQuestionIndex.value = +localStorage.getItem('index')!
          correctAnswerBorder.value = ''
        }, 1000)
      } else {
        correctAnswerBorder.value = 'border-green-600'
        falseAnswerBorder.value = 'border-red-600'
        setTimeout(() => {
          isGameOver.value = true
          falseAnswerBorder.value = ''
          correctAnswerBorder.value = ''
        }, 1000)
      }
    }

    function handleHint (type: string) {
      if (type === 'google') {
        searchCanUseTimes.value -= 1
      } else {
        halfCanUseTimes.value -= 1
      }
    }

    function handleRestart () {
      currentQuestionIndex.value = 0
      isGameOver.value = false
      localStorage.clear()
    }

    return {
      questionsData,
      currentQuestionIndex,
      handleAnswer,
      isGameOver,
      handleRestart,
      correctAnswerBorder,
      falseAnswerBorder,
      handleHint
    }
  }
})
</script>
