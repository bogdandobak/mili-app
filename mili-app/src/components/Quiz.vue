<template>
  <section class="flex flex-col items-center">
    <div v-if="!isGameOver && !isWinner">
      <h2 class="text-center font-semibold text-md">
        {{ questionsData[currentQuestionIndex].question }}
      </h2>
      <Hints
        :searchTimes="searchCanUseTimes"
        :halfTimes="halfCanUseTimes"
        :questionsText="questionsData[currentQuestionIndex].question"
        @handle-hint="handleHint"
      />
      <div class="flex w-full justify-center p-10">
        <ul>
          <li
            v-for="item in answers"
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
      v-else-if="isGameOver && !isWinner"
      @handle-restart="handleRestart"
    />
    <WinGame
      v-else
      @handle-restart="handleRestart"
    />
  </section>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineComponent, ref } from 'vue'
import LoseGame from '@/components/LoseGame.vue'
import WinGame from '@/components/WinGame.vue'
import Hints from '@/components/Hints.vue'
import questions from '@/data/questions.json'
import { IQuestion } from '@/modules/IQuestion'
import { IAnswer } from '@/modules/IAnswer'

export default defineComponent({
  name: 'Quiz',
  components: {
    LoseGame,
    Hints,
    WinGame
  },
  setup () {
    const questionsData = ref<IQuestion[]>(questions)
    const currentQuestionIndex = ref(+localStorage.getItem('index')! || 0)
    const isGameOver = ref(false)
    const correctAnswerBorder = ref('')
    const falseAnswerBorder = ref('')
    const savedAnswers = ref<IQuestion[]>([])
    const searchCanUseTimes = ref(+localStorage.getItem('hintSearch')! || 2)
    const halfCanUseTimes = ref(+localStorage.getItem('hintHalf')! || 2)
    const isWinner = ref(false)
    const answers = ref<IAnswer[]>(questionsData.value[currentQuestionIndex.value].answers)

    function handleWin () {
      isWinner.value = true
    }

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
          answers.value = questionsData.value[currentQuestionIndex.value].answers
        }, 1000)
        if (currentQuestionIndex.value === questionsData.value.length - 1) {
          handleWin()
        }
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
      const secondAnswer = answers.value.filter(item => !item.isCorrect)
      switch (type) {
        case 'search':
          localStorage.setItem('hintSearch', JSON.stringify(searchCanUseTimes.value - 1))
          searchCanUseTimes.value = +localStorage.getItem('hintSearch')!
          break
        case 'half':
          localStorage.setItem('hintHalf', JSON.stringify(halfCanUseTimes.value - 1))
          halfCanUseTimes.value = +localStorage.getItem('hintHalf')!
          answers.value = answers.value.filter(item => item.isCorrect)
          answers.value.push(secondAnswer[0])
          break
        default:
          break
      }
    }

    function handleRestart () {
      currentQuestionIndex.value = 0
      halfCanUseTimes.value = 2
      searchCanUseTimes.value = 2
      isGameOver.value = false
      isWinner.value = false
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
      handleHint,
      searchCanUseTimes,
      halfCanUseTimes,
      isWinner,
      answers
    }
  }
})
</script>
