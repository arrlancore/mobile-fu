// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption by views

import { actionTypes } from './action'

/**
 * default set reducer that will be always return data
 * @param {object} state
 * @param {object} action
 * @param {string} actionType
 */
function setDataReducer(state, action, actionType) {
  if (action.type === actionType) {
    return action.data
  }
  return state
}

export const listPerkuliahanBerjalanReducer = (state = null, action) =>
  setDataReducer(state, action, actionTypes.LIST_PERKULIAHAN_BERJALAN_SUCCESS)

export const PerkuliahanBerjalanReducer = (state = null, action) =>
  setDataReducer(state, action, actionTypes.PERKULIAHAN_BERJALAN_SUCCESS)
