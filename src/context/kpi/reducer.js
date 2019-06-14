// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption by views

import { actionTypes } from './action'

const initialState = { data: null, progress: 0 }

export const kpiCalculationReducer = (state = initialState, action) => {
  if (action.type === actionTypes.PROCESS_FILE_SUCCESS) {
    return {
      data: action.data
    }
  }
  if (action.type === actionTypes.UPLOAD_PROGRESS) {
    return {
      progress: action.data
    }
  }
  return state
}

export const listGroupReducer = (state = { data: [{ name: 1, value: 1 }] }, action) => {
  if (action.type === actionTypes.LIST_GROUP_SUCCESS) {
    return {
      data: action.data
    }
  }
  return state
}
