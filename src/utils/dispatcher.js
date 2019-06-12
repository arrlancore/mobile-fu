export default async function dispatchAction (dispatch, actionType, action) {
  const onRequest = '_REQUEST'
  const onFailure = '_FAILURE'
  dispatch({ type: actionType + onRequest })
  try {
    await action()
  } catch (error) {
    console.error('dispatchAction -> ', error)
    dispatch({ type: actionType + onFailure, error })
  }
}
