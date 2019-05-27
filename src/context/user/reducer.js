import Immutable from 'seamless-immutable'
import {actionTypes} from './action'

const initState = Immutable({
  data: null
})

export const userReducer = (state = initState, action) => {
  if (action.type === actionTypes.USER_LOGIN_SUCCESS) {
    return {
      data: action.data
    }
  }
  return state
}
