<template>
  <div
    v-if="halfCanUseTimes < 2 || searchCanUseTimes < 2"
    class="flex gap-4 justify-center items-center p-4"
  >
    <p class="text-center text-white font-semibold">Hints:</p>
    <button
      v-if="halfCanUseTimes < 2"
      class="h-10 p-2 bg-purple-400 hover:bg-purple-700 text-white font-bold rounded transition-colors"
      @click="handleHint('half')"
    >
      50:50
    </button>
    <a
      v-if="searchCanUseTimes < 2"
      class="h-10 p-2 bg-purple-400 hover:bg-purple-700 text-white font-bold rounded transition-colors"
      :href="`https://www.google.com/search?q=${questionsText}`"
      target="_blank"
      rel="opener"
      @click="handleHint('search')"
    >
      Search in google
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { EHints } from '@/modules/EHints'
import { localStorageService } from '@/services/localStorageService'

export default defineComponent({
  props: {
    questionsText: {
      type: String,
      required: true
    }
  },
  emits: ['handle-hint-half'],
  setup (_, { emit }) {
    const searchCanUseTimes = ref(localStorageService.getItem('hintSearch') || 0)
    const halfCanUseTimes = ref(localStorageService.getItem('hintHalf') || 0)

    function handleHint (type: string) {
      switch (type) {
        case EHints.Search:
          localStorageService.setItem('hintSearch', (searchCanUseTimes.value + 1))
          searchCanUseTimes.value = localStorageService.getItem('hintSearch')
          break
        case EHints.Half:
          localStorageService.setItem('hintHalf', (halfCanUseTimes.value + 1))
          halfCanUseTimes.value = localStorageService.getItem('hintHalf')
          emit('handle-hint-half')
          break
        default:
          break
      }
    }
    return {
      handleHint,
      halfCanUseTimes,
      searchCanUseTimes
    }
  }
})
</script>
