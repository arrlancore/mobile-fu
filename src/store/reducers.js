import { combineReducers } from 'redux'
import login from './login/reducer'
import { loadingReducer, errorReducer } from './default/reducer'

export default combineReducers({
  loading: loadingReducer,
  error: errorReducer,
  login
})
