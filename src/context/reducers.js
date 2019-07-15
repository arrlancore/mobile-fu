import { userReducer } from './auth/reducer'
import {
  kpiUploadReducer,
  listGroupReducer,
  listDocReducer,
  calculateReducer,
  summaryReducer,
  calculationStatusReducer,
  itemsReducer,
  reportReducer,
  listTeamReducer,
  ListGroupByTeamReducer
} from './kpi/reducer'
import { errorReducer, loadingReducer } from './default/reducer'

export const reducers = {
  loading: loadingReducer,
  error: errorReducer,
  user: userReducer,
  kpiUpload: kpiUploadReducer,
  listGroup: listGroupReducer,
  listDoc: listDocReducer,
  kpiCalculate: calculateReducer,
  kpiSummary: summaryReducer,
  kpiCalculationStatus: calculationStatusReducer,
  kpiItem: itemsReducer,
  kpiReport: reportReducer,
  listTeam: listTeamReducer,
  ListGroupByTeam: ListGroupByTeamReducer
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
