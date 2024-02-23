import { useRouter } from 'next/navigation'
import { useCookie } from './useSetCookie'

export const useAuthError = () => {
  const router = useRouter()

  const { getCsrfToken } = useCookie()
  const authenticationErrorHandling = (msg: string) => {
    switch (msg) {
      case 'invalid csrf token':
        getCsrfToken()
        alert('CSRF token is invalid, please try again')
        break
      case 'invalid or expired jwt':
        alert('access token expired, please login')
        router.push('/')
        break
      case 'missing or malformed jwt':
        alert('access token is not valid, please login')
        router.push('/')
        break
      case 'duplicated key not allowed':
        alert('email already exist, please use another one')
        break
      case 'crypto/bcrypt: hashedPassword is not the hash of the given password':
        alert('password is not correct')
        break
      case 'record not found':
        alert('email is not correct')
        break
      default:
        getCsrfToken()
        alert(msg)
    }
  }
  const AuthorizationErrorHandling = (msg: string) => {
    switch (msg) {
      case 'missing or malformed jwt':
        alert('ログインしていません')
        router.replace('/')
        break
      case 'user not found':
        alert('ユーザーが見つかりません。')
        router.replace('/')
        break
      case 'still user not signup verified':
        alert(
          'ユーザー登録が完了していません。ユーザー登録を行ってサイドログインしてください。'
        )
        router.replace('/')
        break
      case 'user is deleted':
        alert('削除済みのユーザーの為アプリを利用できません。')
        router.replace('/')
        break
      default:
        alert('エラーが発生しました。')
    }
  }
  return {
    authenticationErrorHandling,
    AuthorizationErrorHandling,
  }
}
