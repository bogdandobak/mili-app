<template>
  <section class="flex flex-col items-center m-5">
    <div v-if="!isGameOver && !isWinner">
      <h2 class="text-center text-white font-bold">
        {{ questionsData[currentQuestionIndex].question }}
      </h2>
      <Hints
        :questionsText="questionsData[currentQuestionIndex].question"
        @handle-hint-half="handleHintHalf"
      />
      <div class="flex w-full justify-center">
        <ul>
          <QuizItem
            :answers="answers"
            :switchQuestion="switchQuestion"
            :handleIncorrectAnswer="handleIncorrectAnswer"
            :handleScore="handleScore"
          />
        </ul>
      </div>
      <p
        v-if="lifes"
        class="text-center text-white font-semibold"
        :class="lifes < 2 ? 'animate-pulse' : ''"
      >
        Lifes {{ lifes }}
      </p>
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
import { defineComponent, ref, onBeforeUpdate } from 'vue'

import QuizItem from '@/components/QuizItem.vue'
import LoseGame from '@/components/LoseGame.vue'
import WinGame from '@/components/WinGame.vue'
import Hints from '@/components/Hints.vue'

import questions from '@/data/questions.json'
import { localStorageService } from '@/services/localStorageService'

import { IQuestion } from '@/modules/IQuestion'
import { IAnswer } from '@/modules/IAnswer'

export default defineComponent({
  name: 'Quiz',
  components: {
    LoseGame,
    Hints,
    WinGame,
    QuizItem
  },
  setup () {
    const questionsData = ref<IQuestion[]>(questions)

    const currentQuestionIndex = ref(localStorageService.getItem('index') || 0)

    const isWinner = ref(localStorageService.getItem('isWinner') || false)

    const lifes = ref(localStorageService.getItem('lifes') || 5)

    function handleWin () {
      isWinner.value = true
      currentQuestionIndex.value = 0
    }

    const savedAnswers = ref<IQuestion[]>([])

    function saveAsnwer () {
      savedAnswers.value.push(questionsData.value[currentQuestionIndex.value])
      localStorageService.setItem('answers', savedAnswers.value)
    }

    const score = ref(localStorageService.getItem('score') || 0)

    function handleScore () {
      score.value += questionsData.value[currentQuestionIndex.value].points
    }

    const correctAnswerBorder = ref('')
    const answers = ref<IAnswer[]>(questionsData.value[currentQuestionIndex.value].answers)

    function switchQuestion () {
      saveAsnwer()
      currentQuestionIndex.value += 1
      if (currentQuestionIndex.value > questionsData.value.length - 1) {
        handleWin()
        return
      }

      answers.value = questionsData.value[currentQuestionIndex.value].answers
    }

    const falseAnswerBorder = ref('')

    const isGameOver = ref(localStorageService.getItem('isGameOver') || false)

    function handleIncorrectAnswer () {
      if (lifes.value <= 1) {
        isGameOver.value = true
      }

      lifes.value -= 1
    }

    function handleHintHalf () {
      const randomNumber = Math.round(Math.random() * 10)
      const randomIndex = randomNumber <= 2 ? randomNumber : 0
      const uncorrectAnswers = answers.value.filter(item => !item.isCorrect)

      answers.value = answers.value.filter(item => item.isCorrect)
      answers.value.push(uncorrectAnswers[randomIndex])
    }

    function saveData () {
      localStorageService.setItem('index', currentQuestionIndex.value)
      localStorageService.setItem('score', score.value)
      localStorageService.setItem('isWinner', isWinner.value)
      localStorageService.setItem('isGameOver', isGameOver.value)
    }

    saveData()

    onBeforeUpdate(() => {
      saveData()
    })

    function handleRestart () {
      lifes.value = 5
      score.value = 0
      isGameOver.value = false
      isWinner.value = false
      localStorageService.clear()
      currentQuestionIndex.value = 0
      answers.value = questionsData.value[currentQuestionIndex.value].answers
    }

    return {
      questionsData,
      currentQuestionIndex,
      isGameOver,
      handleRestart,
      correctAnswerBorder,
      falseAnswerBorder,
      handleHintHalf,
      isWinner,
      answers,
      score,
      lifes,
      switchQuestion,
      handleScore,
      handleIncorrectAnswer
    }
  }
})
</script>
