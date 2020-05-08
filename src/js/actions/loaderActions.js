/**
 * Actions required for the functionality of Spinner styledComponent
 */

export const HIDE_LOADER = "HIDE_LOADER";

export const hideLoader = () => ({
  type: HIDE_LOADER
})


export const SHOW_LOADER = "SHOW_LOADER";

export const showLoader = () => ({
  type: SHOW_LOADER
})

export const setLoader = isLoading => ({
  type: isLoading ? SHOW_LOADER : HIDE_LOADER
})
