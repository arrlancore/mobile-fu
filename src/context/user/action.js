import axios from 'axios'
import config from 'config'
import getUser from 'utils/userData'
import dispatchAction from 'utils/dispatcher'

// action type strings should be unique across reducers so namespace them with the reducer name
export const actionTypes = {
  USER: 'USER',
  LIST_USER: 'LIST_USER',
  LIST_USER_SUCCESS: 'LIST_USER_SUCCESS',
  USER_SUCCESS: 'USER_SUCCESS'
}

// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
/**
 *
 * @param {function} dispatch
 * @param {object} payload
 */

const moduleRoutes = '/api/users'

export const list = (dispatch, params) => {
  const url = config.baseUrl + moduleRoutes
  const action = async () => {
    const response = await axios.get(url, {
      params,
      headers: { Authorization: getUser().token }
    })
    if (response.status <= 204) {
      let data = response.data
      dispatch({
        type: actionTypes.LIST_USER_SUCCESS,
        data
      })
    } else {
      const message = response.data && response.data.message
      throw new Error(message || 'An error has been occured')
    }
  }
  dispatchAction(dispatch, actionTypes.LIST_USER, action)
}

export const view = (dispatch, params) => {
  const url = config.baseUrl + moduleRoutes + '/view'
  const action = async () => {
    const response = await axios.get(url, {
      params,
      headers: { Authorization: getUser().token }
    })
    if (response.status <= 204) {
      let data = response.data
      dispatch({
        type: actionTypes.USER_SUCCESS,
        data
      })
    } else {
      const message = response.data && response.data.message
      throw new Error(message || 'An error has been occured')
    }
  }
  dispatchAction(dispatch, actionTypes.USER, action)
}

export const create = (dispatch, payload) => {
  const url = config.baseUrl + moduleRoutes
  const action = async () => {
    const response = await axios.post(url, payload, {
      headers: { Authorization: getUser().token }
    })
    if (response.status <= 204) {
      let data = response.data
      dispatch({
        type: actionTypes.USER_SUCCESS,
        data
      })
    } else {
      const message = response.data && response.data.message
      throw new Error(message || 'An error has been occured')
    }
  }
  dispatchAction(dispatch, actionTypes.USER, action)
}

export const update = (dispatch, payload, params) => {
  const url = config.baseUrl + moduleRoutes + '/edit'
  const action = async () => {
    const response = await axios.put(url, payload, {
      params,
      headers: { Authorization: getUser().token }
    })
    if (response.status <= 204) {
      let data = response.data
      dispatch({
        type: actionTypes.USER_SUCCESS,
        data
      })
    } else {
      const message = response.data && response.data.message
      throw new Error(message || 'An error has been occured')
    }
  }
  dispatchAction(dispatch, actionTypes.USER, action)
}

export const remove = (dispatch, params) => {
  const url = config.baseUrl + moduleRoutes + '/remove'
  const action = async () => {
    const response = await axios.delete(url, {
      params,
      headers: { Authorization: getUser().token }
    })
    if (response.status <= 204) {
      let data = response.data
      dispatch({
        type: actionTypes.USER_SUCCESS,
        data
      })
    } else {
      const message = response.data && response.data.message
      throw new Error(message || 'An error has been occured')
    }
  }
  dispatchAction(dispatch, actionTypes.USER, action)
}
