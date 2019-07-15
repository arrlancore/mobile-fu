import { message } from 'antd'
import logout from './logout'
export default async function dispatchAction(dispatch, actionType, action) {
  const onRequest = '_REQUEST'
  const onFailure = '_FAILURE'
  dispatch({ type: actionType + onRequest })
  try {
    await action()
  } catch (error) {
    if (error.response && error.response.status === 401) {
      message.error(error.message).then(() => {
        logout()
      })
    } else {
      message.error(error.message)
    }
    dispatch({ type: actionType + onFailure, error })
  }
}
