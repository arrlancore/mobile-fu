import { createSelector } from 'reselect'

const selectLogin = state => state.login

export const selectDataLogin = createSelector(
  selectLogin,
  data => data
)
