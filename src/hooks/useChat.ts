import axios from 'axios'

export const useMutateChat = () => {
  const getChat = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ws`)
  }

  return {
    getChat,
  }
}
