export default function logout() {
  if (window) {
    window.localStorage.removeItem('isLogin')
    window.location.reload()
  }
}
