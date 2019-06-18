import axios from 'axios'
import config from 'config'
import getUser from 'utils/userData'
import dispatchAction from 'utils/dispatcher'
import { message } from 'antd'

// action type strings should be unique across reducers so namespace them with the reducer name
export const actionTypes = {
  PROCESS_FILE_SUCCESS: 'PROCESS_FILE_SUCCESS',
  PROCESS_FILE: 'PROCESS_FILE',
  LIST_GROUP_SUCCESS: 'LIST_GROUP_SUCCESS',
  LIST_GROUP: 'LIST_GROUP',
  LIST_DOC_SUCCESS: 'LIST_DOC_SUCCESS',
  LIST_DOC: 'LIST_DOC',
  UPLOAD_PROGRESS: 'UPLOAD_PROGRESS'
}

// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
/**
 *
 * @param {function} dispatch
 * @param {object} payload
 */
export const actionProcessFile = async (dispatch, payload) => {
  const user = getUser()
  const url = config.baseUrl + payload.get('url')
  const processFile = async () => {
    const response = await axios.post(url, payload, {
      timeout: 10000,
      headers: { 'Authorization' : user.token },
      onUploadProgress : function(progressEvent) {
        const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
        dispatch({
          type: actionTypes.UPLOAD_PROGRESS,
          progress: percentCompleted
        })
      }
    })
    if (response.data.status === 200 && response.status <= 201) {
      let { data } = response.data
      dispatch({
        type: actionTypes.PROCESS_FILE_SUCCESS,
        data
      })
      message.success(`File "${payload.get('filename')}" has been successfully uploaded`)
    } else {
      const message = response.data && response.data.message
      throw new Error(message || 'An error has been occured')
    }
  }
  await dispatchAction(dispatch, actionTypes.PROCESS_FILE, processFile )
}


/**
 *
 * @param {function} dispatch
 * @param {object} payload
 */
export const actionGetListGroup = (dispatch) => {
  const url = config.baseUrl + '/falcon/group'
  const listGroup = async () => {
    const response = await axios.get(url, {
      timeout: 10000,
      headers: { 'Authorization' : getUser().token }
    })
    if (response.status <= 201) {
      let data = response.data
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

/**
 *
 * @param {function} dispatch
 * @param {object} payload
 */
export const actionGetListDocs = (dispatch) => {
  const url = config.baseUrl + '/googledocs/doc'
  const listGroup = async () => {
    const response = await axios.get(url, {
      timeout: 10000,
      headers: { 'Authorization' : getUser().token }
    })
    if (response.status <= 201) {
      let data = response.data
      dispatch({
        type: actionTypes.LIST_DOC_SUCCESS,
        data
      })
    } else {
      const message = response.data && response.data.message
      throw new Error(message || 'An error has been occured')
    }
  }
  dispatchAction(dispatch, actionTypes.LIST_DOC, listGroup )
}
