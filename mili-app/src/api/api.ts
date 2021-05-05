import axios from 'axios'
import { IUser } from '@/modules/IUser'

const url = 'https://mili-app-default-rtdb.europe-west1.firebasedatabase.app/leaderboard.json'

export async function sendScore (newUser: IUser) {
  const response = await axios.post(url, newUser)

  try {
    if (response.status !== 200) {
      throw new Error(response.statusText)
    }
  } catch (error) {
    throw new Error(error)
  }
}

export async function getLeaderboardData (): Promise<IUser[]> {
  const response = await axios.get(url)

  try {
    if (response.status !== 200) {
      throw new Error(response.statusText)
    }
    const result = await response.data

    return result
  } catch (error) {
    throw new Error(error)
  }
}
