import { createSelector } from 'reselect'

/**
 * 
 * Getters when reading loader state in the redux store
 * 
 * 
 * 
 */

 const loadingStatus = state => state.loader.isLoading;

 export const isLoading = createSelector(
    [loadingStatus],
    status => status
  );