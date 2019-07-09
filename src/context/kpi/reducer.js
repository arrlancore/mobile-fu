// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption by views

import { actionTypes } from './action'

const initialState = { data: null, progress: [] }

/**
 * default set reducer that will be always return data
 * @param {object} state
 * @param {object} action
 * @param {string} actionType
 */
function setDataReducer (state, action, actionType) {
  if (action.type === actionType) {
    return { data: action.data }
  }
  return state
}

export const kpiUploadReducer = (state = initialState, action) => {
  if (action.type === actionTypes.PROCESS_FILE_SUCCESS) {
    return {
      ...state,
      data: action.data
    }
  }
  if (action.type === actionTypes.UPLOAD_PROGRESS) {
    return {
      ...state,
      progress: [ ...state.progress, { [action.progress.doc] : action.progress.percentCompleted } ]
    }
  }
  return state
}

export const listGroupReducer = (state = null, action) =>
  setDataReducer(state, action, actionTypes.LIST_GROUP_SUCCESS)


export const listDocReducer = (state = null, action) =>
  setDataReducer(state, action, actionTypes.LIST_DOC_SUCCESS)


export const calculateReducer = (state = null, action) =>
  setDataReducer(state, action, actionTypes.CALCULATE_KPI_SUCCESS)

export const summaryReducer = (state = null, action) =>
  setDataReducer(state, action, actionTypes.GET_KPI_SUMMARY_SUCCESS)

export const calculationStatusReducer = (state = null, action) =>
  setDataReducer(state, action, actionTypes.GET_CALCULATION_STATUS_SUCCESS)
