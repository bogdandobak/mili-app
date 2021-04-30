<template>
  <button v-if="halfTimes > 0" @click="handleHint('half')">
    50 / 50
  </button>
  <a
    v-if="searchTimes > 0"
    :href="`https://www.google.com/search?q=${questionsText}`"
    target="_blank"
    @click="handleHint('search')"
  >
    Search in google
  </a>
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
