import {getHighScores as getHighScoresBackend} from '../backend'
import {asyncAction} from './utilActions'
import {hideLoader, showLoader} from './loaderActions'

export const SET_HIGHSCORES = "SET_HIGHSCORES"

export const setHighScores = (highScores) => ({
    type: SET_HIGHSCORES,
    highScores
})

export const getHighScores = () => {
    return asyncAction((dispatch, getState) => {
        dispatch(showLoader())
        return getHighScoresBackend()
            .then(snapshot => {
                const highScores = snapshot.docs.map(doc => doc.data())
                dispatch(setHighScores(highScores))
                dispatch(hideLoader())
            })
    },
    "Error getting high scores:")
}