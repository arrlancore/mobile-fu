import { userReducer } from './user/reducer'
import { kpiCalculationReducer } from './kpi/reducer'
import {
  errorReducer, loadingReducer
} from './default/reducer'

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

const reducer = combineReducers({
  loading: loadingReducer,
  error: errorReducer,
  user: userReducer,
  kpiCalculation: kpiCalculationReducer
})

export default reducer
