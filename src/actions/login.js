import axios from 'axios'
import * as actionTypes from './actionTypes'
import Cookies from 'js-cookie'
import config from 'config'

/**
 */
export const loginUser = data => dispatch => {
  // Start
  const dataStart = {
    loading: true
  }
  dispatch(storeDataUser(dataStart))
  axios({
    url: 'login',
    method: 'post',
    baseURL: config.baseUrl,
    data,
    timeout: 10000
  }).then(response => {
    if (response.data.status === 200 && response.status <= 201) {
      let { data } = response.data
      data.token = `Basic ${btoa(`${data.userName}:${data.password}`)}`
      data.password = undefined
      data.status = undefined
      const dataSuccess = {
        loading: false,
        data: data
      }
      setTimeout(() => {
        Cookies.set('user', JSON.stringify(data))
        localStorage.setItem('isLogin', 'true')
        dispatch(storeDataUser(dataSuccess))
      }, 2000)
    } else {
      let message = response.data && response.data.message
      const dataError = {
        loading: false,
        formError: true,
        error: message || 'unknown error'
      }
      dispatch(storeDataUser(dataError))
    }
  })
    .catch(error => {
      console.error(error)
      const dataError = {
        loading: false,
        formError: true,
        error: error.message
      }

      dispatch(storeDataUser(dataError))
    })
}

export const storeDataUser = data => ({
  type: actionTypes.DATA_USER,
  data
})
