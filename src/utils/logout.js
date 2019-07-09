import Cookies from 'js-cookie'

export default function Logout(setLogoutState) {
  if (window) {
    window.localStorage.removeItem('isLogin')
    Cookies.remove('user')
  }
  setLogoutState(true)
}
