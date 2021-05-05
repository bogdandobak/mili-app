<template>
  <section class="flex flex-col items-center gap-5 py-6 md:py-28">
    <router-view />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>
