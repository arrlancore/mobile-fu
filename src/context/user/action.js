import axios from 'axios'
import Cookies from 'js-cookie'
import config from 'config'

export const actionTypes = {
  USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
  USER_LOGIN_REQUEST: 'USER_LOGIN_REQUEST',
  USER_LOGIN_FAILURE: 'USER_LOGIN_FAILURE'
}

export const actionLogin = async (dispatch, data) => {
  // Start
  const url = config.baseUrl + '/login'
  dispatch({
    type: actionTypes.USER_LOGIN_REQUEST
  })
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
        type: actionTypes.USER_LOGIN_SUCCESS,
        data
      })
    } else {
      const message = response.data && response.data.message
      throw new Error(message || 'An error has been occured')
    }
  } catch (error) {
    dispatch({
      type: actionTypes.USER_LOGIN_FAILURE,
      error
    })
  }
}
