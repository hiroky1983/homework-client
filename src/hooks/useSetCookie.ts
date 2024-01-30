import axios from 'axios'

export const useCookie = () => {
  axios.defaults.withCredentials = true
  const getCsrfToken = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/csrf`)
    axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token
  }
  return { getCsrfToken }
}
