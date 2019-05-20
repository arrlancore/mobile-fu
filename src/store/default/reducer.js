// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption by views
import Immutable from 'seamless-immutable'


export const loadingReducer = (state = Immutable({}), action) => {
  const { type } = action
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type)

  // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
  if (!matches) return state

  const [ , requestName, requestState ] = matches
  return {
    ...state,
    // Store whether a request is happening at the moment or not
    // e.g. will be true when receiving GET_TODOS_REQUEST
    //      and false when receiving GET_TODOS_SUCCESS / GET_TODOS_FAILURE
    [requestName]: requestState === 'REQUEST'
  }
}

export const errorReducer = (state = Immutable({}), action) => {
  const { type, error } = action
  const matches = /(.*)_(REQUEST|FAILURE)/.exec(type)

  // not a *_REQUEST / *_FAILURE actions, so we ignore them
  if (!matches) return state

  const [ , requestName, requestState ] = matches
  return {
    ...state,
    // Store errorMessage
    // e.g. stores errorMessage when receiving GET_TODOS_FAILURE
    //      else clear errorMessage when receiving GET_TODOS_REQUEST
    [requestName]: requestState === 'FAILURE' ? error.message : ''
  }
}
