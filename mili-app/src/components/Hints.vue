<template>
  <div class="flex gap-4 justify-center items-center p-4">
    <p>Hints:</p>
    <button
      v-if="halfTimes > 0"
      class="h-10 p-2 bg-purple-500 hover:bg-purple-700 text-white font-bold rounded"
      @click="handleHint('half')"
    >
      50 / 50
    </button>
    <a
      v-if="searchTimes > 0"
      class="h-10 p-2 bg-purple-500 hover:bg-purple-700 text-white font-bold rounded"
      :href="`https://www.google.com/search?q=${questionsText}`"
      target="_blank"
      @click="handleHint('search')"
    >
      Search in google
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    questionsText: {
      type: String,
      required: true
    },
    halfTimes: {
      type: Number,
      required: true
    },
    searchTimes: {
      type: Number,
      required: true
    }
  },
  emits: ['handle-hint'],
  setup (_, { emit }) {
    function handleHint (type: string) {
      emit('handle-hint', type)
    }

    return {
      handleHint
    }
  }
})
</script>
