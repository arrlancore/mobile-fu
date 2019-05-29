import Nprogress from 'nprogress'

export const loadingReducer = (state = {}, action) => {
  const { type } = action
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type)

  // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
  if (!matches) return state

  const [ , requestName, requestState ] = matches
  const load = requestState === 'REQUEST'
  const done = requestState === 'SUCCESS'
  if (load) Nprogress.set(0.3)
  if (done) Nprogress.done()
  return {
    ...state,
    // Store whether a request is happening at the moment or not
    // e.g. will be true when receiving GET_TODOS_REQUEST
    //      and false when receiving GET_TODOS_SUCCESS / GET_TODOS_FAILURE
    [requestName]: load
  }
}

export const errorReducer = (state = {}, action) => {
  const {
    type, error
  } = action
  const matches = /(.*)_(REQUEST|FAILURE)/.exec(type)

  // not a *_REQUEST / *_FAILURE actions, so we ignore them
  if (!matches) return state

  const [ , requestName, requestState ] = matches
  console.error('errorReducer:', error)
  return {
    ...state,
    // Store errorMessage
    // e.g. stores errorMessage when receiving GET_TODOS_FAILURE
    //      else clear errorMessage when receiving GET_TODOS_REQUEST
    [requestName]: requestState === 'FAILURE' ? error.message : ''
  }
}
