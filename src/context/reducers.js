import { userReducer } from './auth/reducer'
import { listUserReducer, singleUserReducer } from './general/reducer'
import { errorReducer, loadingReducer } from './default/reducer'

export const reducers = {
  loading: loadingReducer,
  error: errorReducer,
  user: userReducer,
  listUser: listUserReducer,
  singleUser: singleUserReducer
}

const combineReducers = reducer => {
  return (state = {}, action) => {
    const keys = Object.keys(reducer)
    const nextReducers = {}
    for (let i = 0; i < keys.length; i++) {
      const invoke = reducer[keys[i]](state[keys[i]], action)
      nextReducers[keys[i]] = invoke
    }
    return nextReducers
  }
}

export default combineReducers(reducers)
