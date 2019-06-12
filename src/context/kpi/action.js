import axios from 'axios'
import config from 'config'
import getUser from 'utils/userData'
import dispatchAction from 'utils/dispatcher'

// action type strings should be unique across reducers so namespace them with the reducer name
export const actionTypes = {
  PROCESS_FILE_SUCCESS: 'PROCESS_FILE_SUCCESS',
  PROCESS_FILE: 'PROCESS_FILE',
  LIST_GROUP_SUCCESS: 'LIST_GROUP_SUCCESS',
  LIST_GROUP: 'LIST_GROUP'
}

// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
/**
 *
 * @param {function} dispatch
 * @param {object} payload
 */
export const actionProcessFile = (dispatch, payload) => {
  const user = getUser()
  const url = config.baseUrl + '/googledocs/error'
  const processFile = async () => {
    const response = await axios.post(url, payload, {
      timeout: 10000,
      headers: { 'Authorization' : user.token }
    })
    if (response.data.status === 200 && response.status <= 201) {
      let { data } = response.data
      dispatch({
        type: actionTypes.PROCESS_FILE_SUCCESS,
        data
      })
    } else {
      const message = response.data && response.data.message
      throw new Error(message || 'An error has been occured')
    }
  }
  dispatchAction(dispatch, actionTypes.PROCESS_FILE, processFile )
}


/**
 *
 * @param {function} dispatch
 * @param {object} payload
 */
export const actionGetListGroup = (dispatch, payload) => {
  const user = getUser()
  const url = config.baseUrl + '/googledocs/group'
  const listGroup = async () => {
    const response = await axios.get(url, payload, {
      timeout: 10000,
      headers: { 'Authorization' : user.token }
    })
    if (response.status <= 201) {
      let { data } = response.data
      dispatch({
        type: actionTypes.LIST_GROUP_SUCCESS,
        data
      })
    } else {
      const message = response.data && response.data.message
      throw new Error(message || 'An error has been occured')
    }
  }
  dispatchAction(dispatch, actionTypes.LIST_GROUP, listGroup )
}
