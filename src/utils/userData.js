import Cookies from 'js-cookie'

const getUser = () => {
  const userData = Cookies.get('user')
  return userData ? JSON.parse(userData) : null
}
export default getUser

const isLogin = () => {
  const datalogin = JSON.parse(localStorage.getItem('isLogin')) || false
  const isLogin = !!(datalogin && getUser())
  return isLogin
}
export { isLogin }
