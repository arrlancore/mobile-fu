import axios from 'axios'
import Cookies from 'js-cookie'
import config from 'config'
import jwtDecode from 'jwt-decode'
import dispatchAction from 'utils/dispatcher'

export const actionTypes = {
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS'
}

export const actionLogin = (dispatch, payload) => {
  const url = config.baseUrl + '/login'
  const userLogin = async () => {
    const response = await axios.post(url, payload, { timeout: 10000 })
    let { data } = response.data
    if (response.data.status === 200 && response.status <= 201) {
      const user = {
        token: 'Bearer ' + data,
        ...jwtDecode(data)
      }
      Cookies.set('user', JSON.stringify(user))
      localStorage.setItem('isLogin', 'true')
      dispatch({
        type: actionTypes.USER_LOGIN_SUCCESS,
        data: user
      })
    } else {
      const message = response.data && response.data.message
      throw new Error(message || 'An error has been occured during the login')
    }
  }
  dispatchAction(dispatch, actionTypes.USER_LOGIN, userLogin )
}
