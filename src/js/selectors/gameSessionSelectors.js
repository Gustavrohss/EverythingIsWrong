import { createSelector } from 'reselect'

const getName = state => state.user.name

export const getUsername = createSelector(
  [getName],
  name => name
)
