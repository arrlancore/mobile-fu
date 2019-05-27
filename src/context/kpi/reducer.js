// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption by views

import Immutable from 'seamless-immutable'
import { actionTypes } from './action'
// import { updateObject } from 'utils/updateObject'

const initialState = Immutable({ data: null })

export const kpiCalculationReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.PROCESS_FILE_SUCCESS:
    return {
      ...state, data: action.data
    }

  default:
    return state
  }
}
