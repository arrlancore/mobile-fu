import axios from 'axios'
import config from 'config'
import getUser from 'utils/userData'

// action type strings should be unique across reducers so namespace them with the reducer name
const PROCESS_FILE_SUCCESS = 'PROCESS_FILE_SUCCESS'
const PROCESS_FILE_REQUEST = 'PROCESS_FILE_REQUEST'
const PROCESS_FILE_FAILURE = 'PROCESS_FILE_FAILURE'
export const actionTypes = { PROCESS_FILE_SUCCESS }

// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
// there are 3 types of actions:
//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer

export const actionProcessFile = async (dispatch, data) => {
  // Start
  dispatch({ type: PROCESS_FILE_REQUEST })
  const user = getUser()
  const url = config.baseUrl + '/googledocs/error'
  console.log('TCL: user', user.token)
  try {
    const response = await axios.post(url, data, {
      timeout: 10000,
      headers: { 'Authorization' : user.token }
    })
    if (response.data.status === 200 && response.status <= 201) {
      let { data } = response.data
      dispatch({
        type: PROCESS_FILE_SUCCESS,
        data
      })
    } else {
      const message = response.data && response.data.message
      throw new Error(message || 'An error has been occured')
    }
  } catch (error) {
    dispatch({
      type: PROCESS_FILE_FAILURE,
      error
    })
  }
}
