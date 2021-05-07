<template>
  <section class="flex flex-col items-center p-24">
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
            @switch-question="switchQuestion"
            @handle-incorrect-answer="handleIncorrectAnswer"
            @handle-score="handleScore"
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
      <ul
        v-if="answersCount.length > 0"
        class="flex flex-row gap-2 justify-center font-bold"
      >
        <li
          v-for="item in answersCount"
          :key="item.id"
          :class="item.isCorrect ? 'text-green-700' : 'text-red-700'"
        >
          {{ item.id }}
        </li>
      </ul>
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

import questionsS from '@/data/questionsS.json'
import { localStorageService } from '@/services/localStorageService'

import { IQuestion } from '@/modules/IQuestion'
import { IAnswer } from '@/modules/IAnswer'
import { IAnswerCount } from '@/modules/IAnswerCount'

export default defineComponent({
  name: 'Quiz',
  components: {
    LoseGame,
    Hints,
    WinGame,
    QuizItem
  },
  setup () {
    const questionsData = ref<IQuestion[]>(questionsS)
    const currentQuestionIndex = ref<number>(localStorageService.getItem('index') || 0)
    const isWinner = ref<boolean>(localStorageService.getItem('isWinner') || false)
    const lifes = ref<number>(localStorageService.getItem('lifes') || 5)
    const answersCount = ref<IAnswerCount[]>(localStorageService.getItem('savedCount') || [])

    function handleWin () {
      isWinner.value = true
      currentQuestionIndex.value = questionsData.value.length - 1
    }

    const score = ref<number>(localStorageService.getItem('score') || 0)

    function handleScore () {
      const newItem = {
        id: currentQuestionIndex.value,
        isCorrect: true
      }
      answersCount.value.push(newItem)
      score.value += questionsData.value[currentQuestionIndex.value].points
    }

    const answers = ref<IAnswer[]>(questionsData.value[currentQuestionIndex.value].answers)

    function switchQuestion () {
      currentQuestionIndex.value += 1
      if (currentQuestionIndex.value > questionsData.value.length - 1) {
        handleWin()
        return
      }

      answers.value = questionsData.value[currentQuestionIndex.value].answers
    }

    const isGameOver = ref<boolean>(localStorageService.getItem('isGameOver') || false)

    function handleIncorrectAnswer () {
      if (lifes.value <= 1) {
        isGameOver.value = true
      }
      const newItem = {
        id: currentQuestionIndex.value,
        isCorrect: false
      }
      answersCount.value.push(newItem)
      lifes.value -= 1
    }

    const answersLength = answers.value.length - 1

    function handleHintHalf () {
      const randomNumber = Math.round(Math.random() * 10)
      const randomIndex = randomNumber <= answersLength ? randomNumber : 0
      const incorrectAnswers = answers.value.filter(item => !item.isCorrect)

      answers.value = answers.value.filter(item => item.isCorrect)
      answers.value.push(incorrectAnswers[randomIndex])
    }

    function saveDataToStorage () {
      localStorageService.setItem('index', currentQuestionIndex.value)
      localStorageService.setItem('score', score.value)
      localStorageService.setItem('lifes', lifes.value)
      localStorageService.setItem('isWinner', isWinner.value)
      localStorageService.setItem('isGameOver', isGameOver.value)
      localStorageService.setItem('savedCount', answersCount.value)
    }

    onBeforeUpdate(() => {
      saveDataToStorage()
    })

    function handleRestart () {
      lifes.value = 5
      score.value = 0
      isGameOver.value = false
      isWinner.value = false
      currentQuestionIndex.value = 0
      answersCount.value = []
      answers.value = questionsData.value[currentQuestionIndex.value].answers
      localStorageService.clear()
    }

    return {
      questionsData,
      currentQuestionIndex,
      isGameOver,
      handleRestart,
      handleHintHalf,
      isWinner,
      answers,
      score,
      lifes,
      switchQuestion,
      handleScore,
      handleIncorrectAnswer,
      answersCount
    }
  }
})
</script>
