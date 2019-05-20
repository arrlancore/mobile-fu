import axios from 'axios'
import Cookies from 'js-cookie'
import config from 'config'
import { onActionFailure, onActionRequest } from 'store/default/action'

// action type strings should be unique across reducers so namespace them with the reducer name
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const actionTypes = {
  LOGIN_SUCCESS
}

// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
// there are 3 types of actions:
//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer

export const actionLogin = data => async dispatch => {
  // Start
  dispatch(onActionRequest(LOGIN_REQUEST))
  const url = config.baseUrl + '/login'
  try {
    const response = await axios.post(url, data, { timeout: 10000 })
    if (response.data.status === 200 && response.status <= 201) {
      let { data } = response.data
      data.token = `Basic ${btoa(`${data.userName}:${data.password}`)}`
      data.password = undefined
      data.status = undefined
      Cookies.set('user', JSON.stringify(data))
      localStorage.setItem('isLogin', 'true')
      dispatch({
        type: LOGIN_SUCCESS,
        data
      })
    } else {
      const message = response.data && response.data.message
      throw new Error(message || 'An error has been occured')
    }
  } catch (error) {
    dispatch(onActionFailure(error, LOGIN_FAILURE))
  }
}
