<template>
  <section class="flex flex-col items-center gap-4">
    <h2 class="text-white text-lg font-bold">
      Leaderboard
    </h2>
    <ul class="text-white flex flex-col items-center gap-4">
      <li
        v-for="user in userData"
        :key="user.name"
        class="p-2 border-2 rounded-md"
      >
        {{ user.name }}, score: {{ user.score }}
      </li>
    </ul>
    <BaseButton
      link="/"
    >
      Home
    </BaseButton>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue'
import { IUser } from '@/modules/IUser'
import { getLeaderboardData } from '@/api/api'

export default defineComponent({
  setup () {
    const userData = ref<IUser[]>([])

    async function getData () {
      const response = await getLeaderboardData()
      const result = response
      for (const key in result) {
        userData.value.push(result[key])
        userData.value.sort((currVal, nextVal) => nextVal.score - currVal.score)
      }
    }

    onBeforeMount(() => {
      getData()
    })

    return {
      userData,
      getData
    }
  }
})
</script>
