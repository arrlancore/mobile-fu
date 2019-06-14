import { userReducer } from './user/reducer'
import { kpiCalculationReducer, listGroupReducer } from './kpi/reducer'
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

export const reducers = {
  loading: loadingReducer,
  error: errorReducer,
  user: userReducer,
  kpiCalculation: kpiCalculationReducer,
  listGroup: listGroupReducer
}

export default combineReducers(reducers)
