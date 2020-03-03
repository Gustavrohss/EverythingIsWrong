export const SET_USERNAME = "SET_USERNAME";

export const setUsername = function (newName) {
  return {
    type: SET_USERNAME,
    newName
  }
}
