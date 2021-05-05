<template>
  <h1>Hello</h1>
  <ul class="text-white">
    <li v-for="user in userData" :key="user.name">
      {{ user.name }}, score: {{ user.score }}
    </li>
  </ul>
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
      const result = await response
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
