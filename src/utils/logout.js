import Cookies from 'js-cookie'

export default function logout() {
  if (window) {
    window.localStorage.removeItem('isLogin')
    Cookies.remove('user')
    window.location.reload()
  }
}
