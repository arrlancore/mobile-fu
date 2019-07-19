import axios from 'axios'
import Cookies from 'js-cookie'
import config from 'config'
import dispatchAction from 'utils/dispatcher'

export const actionTypes = {
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS'
}

export const actionLogin = (dispatch, payload) => {
  const url = config.baseUrl + '/api/auth/login'
  const userLogin = async () => {
    const response = await axios.post(url, payload, { timeout: 10000 })
    let { data, token } = response.data
    if (response.status <= 201) {
      const user = {
        token: token,
        ...data
      }
      Cookies.set('user', JSON.stringify(user))
      console.log('TCL: userLogin -> user', user)
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
  dispatchAction(dispatch, actionTypes.USER_LOGIN, userLogin)
}
