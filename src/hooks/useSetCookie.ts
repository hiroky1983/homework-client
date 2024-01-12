import axios from 'axios'

export const useCookie = () => {
  axios.defaults.withCredentials = true
  const getCsrfToken = async () => {
    const { data } = await axios.get('/api/csrf') // Next.jsのAPIルートを呼び出す
    axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token
  }
  return { getCsrfToken }
}
