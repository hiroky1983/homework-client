import { useRouter } from 'next/navigation'
import { useCookie } from './useSetCookie'
import { useToast } from '@/provider/toastProvider'

export const useAuthError = () => {
  const router = useRouter()
  const { showToast } = useToast()
  const { getCsrfToken } = useCookie()
  const authenticationErrorHandling = (msg: string) => {
    switch (msg) {
      case 'invalid csrf token':
        getCsrfToken()
        showToast('CSRF token is invalid, please try again', 'error')
        break
      case 'invalid or expired jwt':
        showToast('access token expired, please login', 'error')
        router.push('/')
        break
      case 'missing or malformed jwt':
        showToast('access token is not valid, please login', 'error')
        router.push('/')
        break
      case 'duplicated key not allowed':
        showToast('email already exist, please use another one', 'error')
        break
      case 'crypto/bcrypt: hashedPassword is not the hash of the given password':
        showToast('password is not correct', 'error')
        break
      case 'record not found':
        showToast('email is not correct', 'error')
        break
      default:
        getCsrfToken()
        alert(msg)
    }
  }
  const authorizationErrorHandling = (msg: string) => {
    switch (msg) {
      case 'missing or malformed jwt':
        showToast('ログインしていません', 'error')
        router.replace('/')
        break
      case 'user not found':
        showToast('ユーザーが見つかりません。', 'error')
        router.replace('/not-found')
        break
      case 'still user not signup verified':
        showToast(
          'ユーザー登録が完了していません。ユーザー登録を行ってサイドログインしてください。',
          'error'
        )
        router.replace('/')
        break
      case 'user is deleted':
        showToast('削除済みのユーザーの為アプリを利用できません。', 'error')
        router.replace('/')
        break
      default:
        showToast('エラーが発生しました。', 'error')
    }
  }
  return {
    authenticationErrorHandling,
    authorizationErrorHandling,
  }
}
