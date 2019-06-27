import Cookies from 'js-cookie'

const getUser = (short) => {
  const userData = Cookies.get('user')
  const data = userData ? JSON.parse(userData) : null
  const { sub, role, fullname, employeeid } = data || {}
  return data && short ? { sub, role, fullname, employeeid } : data
}
export default getUser

const isLogin = () => {
  const datalogin = JSON.parse(localStorage.getItem('isLogin')) || false
  const isLogin = !!(datalogin && getUser())
  return isLogin
}
export { isLogin }
