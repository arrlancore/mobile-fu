import { message } from 'antd'

export default async function dispatchAction (dispatch, actionType, action) {
  const onRequest = '_REQUEST'
  const onFailure = '_FAILURE'
  const logout = () => {
    if (window) {
      window.localStorage.removeItem('isLogin')
      window.location.reload()
    }
  }
  dispatch({ type: actionType + onRequest })
  try {
    await action()
  } catch (error) {
    if (error.response && error.response.status) {
      message.error('Your session has been expired').then(() => {
        logout()
      })
    }
    dispatch({ type: actionType + onFailure, error })
  }
}
