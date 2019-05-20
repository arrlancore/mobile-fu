const ON_ACTION_FAILURE = 'ON_ACTION_FAILURE'
const ON_ACTION_SUCCESS = 'ON_ACTION_SUCCESS'
export const actionTypes = {
  ON_ACTION_FAILURE,
  ON_ACTION_SUCCESS
}

// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
// there are 3 types of actions:
//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer


export const onActionFailure = (error, action) => ({
  type: action,
  error
})

export const onActionRequest = (action) => ({
  type: action
})

export const onActionFinish = (action) => ({
  type: action
})
