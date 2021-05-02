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
      <div class="flex w-full justify-center">
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
      <p>Lifes {{ lifes }}</p>
    </div>
    <LoseGame
      v-else-if="isGameOver && !isWinner"
      :score="score"
      @handle-restart="handleRestart"
    />
    <WinGame
      v-else
      :score="score"
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
    const correctAnswerBorder = ref('')
    const falseAnswerBorder = ref('')
    const savedAnswers = ref<IQuestion[]>([])
    const searchCanUseTimes = ref(+localStorage.getItem('hintSearch')! || 2)
    const halfCanUseTimes = ref(+localStorage.getItem('hintHalf')! || 2)
    const isGameOver = ref(false)
    const isWinner = ref(false)
    const answers = ref<IAnswer[]>(questionsData.value[currentQuestionIndex.value].answers)
    const score = ref(+localStorage.getItem('score')! || 0)
    const lifes = ref(+localStorage.getItem('lifes')! || 5)

    function handleWin () {
      isWinner.value = true
    }

    function saveAsnwer () {
      savedAnswers.value.push(questionsData.value[currentQuestionIndex.value])
      localStorage.setItem('answers', JSON.stringify(savedAnswers))
    }

    const easyQ = 4
    const midQ = 9
    const hardQ = 14

    function handleScore () {
      if (currentQuestionIndex.value <= easyQ) {
        localStorage.setItem('score', JSON.stringify(score.value + 1))
        score.value = +localStorage.getItem('score')!
      }
      if (currentQuestionIndex.value > easyQ && currentQuestionIndex.value <= midQ) {
        localStorage.setItem('score', JSON.stringify(score.value + 3))
        score.value = +localStorage.getItem('score')!
      }
      if (currentQuestionIndex.value > midQ && currentQuestionIndex.value <= hardQ) {
        localStorage.setItem('score', JSON.stringify(score.value + 5))
        score.value = +localStorage.getItem('score')!
      }
    }

    function switchQuestion () {
      saveAsnwer()
      correctAnswerBorder.value = 'border-green-600'
      setTimeout(() => {
        localStorage.setItem('index', JSON.stringify(currentQuestionIndex.value + 1))
        if (+localStorage.getItem('index')! > questionsData.value.length - 1) {
          handleWin()
          return
        }
        currentQuestionIndex.value = +localStorage.getItem('index')!
        correctAnswerBorder.value = ''
        answers.value = questionsData.value[currentQuestionIndex.value].answers
      }, 1000)
    }

    function handleIncorrectAnswer () {
      if (lifes.value === 0) {
        isGameOver.value = true
      }
      correctAnswerBorder.value = 'border-green-600'
      falseAnswerBorder.value = 'border-red-600'
      localStorage.setItem('lifes', JSON.stringify(lifes.value - 1))
      lifes.value = +localStorage.getItem('lifes')!
      setTimeout(() => {
        falseAnswerBorder.value = ''
        correctAnswerBorder.value = ''
      }, 1000)
    }

    function handleAnswer (answer: string) {
      const answerData = questionsData.value[currentQuestionIndex.value].answers.find(item => item.text === answer)

      if (+localStorage.getItem('index')! > questionsData.value.length - 1) {
        return
      }

      if (answerData?.isCorrect && lifes.value) {
        switchQuestion()
        handleScore()
      } else {
        handleIncorrectAnswer()
        switchQuestion()
      }
    }

    function handleHint (type: string) {
      const randomNumber = Math.round(Math.random() * 10)
      const randomIndex = randomNumber <= 2 ? randomNumber : 0
      const uncorrectAnswers = answers.value.filter(item => !item.isCorrect)
      switch (type) {
        case 'search':
          localStorage.setItem('hintSearch', JSON.stringify(searchCanUseTimes.value - 1))
          searchCanUseTimes.value = +localStorage.getItem('hintSearch')!
          break
        case 'half':
          localStorage.setItem('hintHalf', JSON.stringify(halfCanUseTimes.value - 1))
          halfCanUseTimes.value = +localStorage.getItem('hintHalf')!
          answers.value = answers.value.filter(item => item.isCorrect)
          answers.value.push(uncorrectAnswers[randomIndex])
          break
        default:
          break
      }
    }

    function handleRestart () {
      lifes.value = 5
      score.value = 0
      falseAnswerBorder.value = ''
      correctAnswerBorder.value = ''
      isGameOver.value = false
      isWinner.value = false
      localStorage.clear()
      halfCanUseTimes.value = 2
      searchCanUseTimes.value = 2
      currentQuestionIndex.value = 0
      answers.value = questionsData.value[currentQuestionIndex.value].answers
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
      answers,
      score,
      lifes
    }
  }
})
</script>
