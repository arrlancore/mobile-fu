import * as actionTypes from 'actions/actionTypes'
import { updateObject } from 'utils/updateObject'

const initialState = {
  loading: false,
  data: null,
  error: null,
  formError: null
}

const storeDataUSer = (state, action) => updateObject(state, action.data)

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.DATA_USER:
    return storeDataUSer(state, action)

  default:
    return state
  }
}

export default reducer
