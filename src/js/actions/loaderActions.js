export const HIDE_LOADER = "HIDE_LOADER";

export const hideLoader = function () {
  return {
    type: HIDE_LOADER
  }
}

export const SHOW_LOADER = "SHOW_LOADER";

export const showLoader = function () {
  return {
    type: SHOW_LOADER
  }
}