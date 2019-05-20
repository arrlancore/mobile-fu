import axios from 'axios'
import Cookies from 'js-cookie'
import config from 'config'

// action type strings should be unique across reducers so namespace them with the reducer name
const DATA_USER = 'DATA_USER'
export const actionTypes = {
  DATA_USER
}

// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
// there are 3 types of actions:
//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer

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
      Cookies.set('user', JSON.stringify(data))
      localStorage.setItem('isLogin', 'true')
      dispatch(storeDataUser(dataSuccess))
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
  type: DATA_USER,
  data
})
