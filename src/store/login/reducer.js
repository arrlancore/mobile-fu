// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption by views

import Immutable from 'seamless-immutable'
import { actionTypes } from './action'
// import { updateObject } from 'utils/updateObject'

const initialState = Immutable({
  loading: false,
  data: null,
  error: null,
  formError: null
})

const storeDataUser = (state, action) => {
  return { ...state, ...action.data }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.DATA_USER:
    return storeDataUser(state, action)

  default:
    return state
  }
}

export default reducer
