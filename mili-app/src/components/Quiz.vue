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
            :correctAnswerBorder="correctAnswerBorder"
            :falseAnswerBorder="falseAnswerBorder"
            @handle-answer="handleAnswer"
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
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineComponent, ref } from 'vue'

import QuizItem from '@/components/QuizItem.vue'
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
    WinGame,
    QuizItem
  },
  setup () {
    const questionsData = ref<IQuestion[]>(questions)
    const currentQuestionIndex = ref(+localStorage.getItem('index')! || 0)
    const isWinner = ref<boolean>(JSON.parse(localStorage.getItem('isWinner')!) || false)

    function handleWin () {
      localStorage.setItem('isWinner', JSON.stringify(true))
      isWinner.value = JSON.parse(localStorage.getItem('isWinner')!)
      localStorage.setItem('index', JSON.stringify(0))
    }

    const savedAnswers = ref<IQuestion[]>([])

    function saveAsnwer () {
      savedAnswers.value.push(questionsData.value[currentQuestionIndex.value])
      localStorage.setItem('answers', JSON.stringify(savedAnswers))
    }

    const easyQ = 4
    const midQ = 9
    const hardQ = 14

    const score = ref(+localStorage.getItem('score')! || 0)

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

    const correctAnswerBorder = ref('')
    const answers = ref<IAnswer[]>(questionsData.value[currentQuestionIndex.value].answers)

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

    const falseAnswerBorder = ref('')
    const isGameOver = ref<boolean>(JSON.parse(localStorage.getItem('isGameOver')!) || false)
    const lifes = ref(+localStorage.getItem('lifes')! || 5)

    function handleIncorrectAnswer () {
      if (lifes.value <= 1) {
        localStorage.setItem('isGameOver', JSON.stringify(true))
        isGameOver.value = JSON.parse(localStorage.getItem('isGameOver')!)
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

    function handleHintHalf () {
      const randomNumber = Math.round(Math.random() * 10)
      const randomIndex = randomNumber <= 2 ? randomNumber : 0
      const uncorrectAnswers = answers.value.filter(item => !item.isCorrect)

      answers.value = answers.value.filter(item => item.isCorrect)
      answers.value.push(uncorrectAnswers[randomIndex])
    }

    function handleRestart () {
      lifes.value = 5
      score.value = 0
      falseAnswerBorder.value = ''
      correctAnswerBorder.value = ''
      isGameOver.value = false
      isWinner.value = false
      localStorage.clear()
      currentQuestionIndex.value = 0
      answers.value = questionsData.value[currentQuestionIndex.value].answers
      localStorage.setItem('isGameStarted', JSON.stringify(true))
    }

    return {
      questionsData,
      currentQuestionIndex,
      handleAnswer,
      isGameOver,
      handleRestart,
      correctAnswerBorder,
      falseAnswerBorder,
      handleHintHalf,
      isWinner,
      answers,
      score,
      lifes
    }
  }
})
</script>
