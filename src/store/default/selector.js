
export const createLoadingSelector = actions => state =>
// returns true only when all actions is not loading
  actions.some(action => state.loading[action])

export const createErrorSelector = actions => (state) => {
  const errors = actions.map(action => state.error[action])
  // returns the first error messages for actions
  // * We assume when any request fails on a page that
  //   requires multiple API calls, we shows the first error
  if (errors && errors[0]) {
    console.error(errors)
    return errors[0]
  }
  return ''
}
