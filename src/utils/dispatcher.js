import { message } from 'antd'
import logout from './logout'

export default async function dispatchAction(dispatch, actionType, action) {
  const dev = process.env.NODE_ENV === 'development'
  const onRequest = '_REQUEST'
  const onFailure = '_FAILURE'
  dispatch({ type: actionType + onRequest })
  try {
    await action()
  } catch (error) {
    const response = error.response || {}
    if (dev) console.info('[Error]:', error.response.data)
    const textMessage =
      response.data && response.data.error ? response.data.error + '. ' : ''
    if (error.response && error.response.status === 401) {
      message.error(textMessage + error.message).then(() => {
        logout()
      })
    } else {
      message.error(textMessage + error.message)
    }
    dispatch({ type: actionType + onFailure, error })
  }
}
