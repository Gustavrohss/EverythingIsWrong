import {getHighScores as getHighScoresBackend} from '../backend'
import {asyncAction} from './utilActions'

export const SET_AVAILABLE = "SET_AVAILABLE"

export const setAvailable = (available) => ({
    type: SET_AVAILABLE,
    available
})

export const SET_HIGHSCORES = "SET_HIGHSCORES"

export const setHighScores = (highScores) => ({
    type: SET_HIGHSCORES,
    highScores
})

export const getHighScores = () => {
    return asyncAction((dispatch, getState) => {
        return getHighScoresBackend()
            .then(snapshot => {
                const highScores = snapshot.docs.map(doc => doc.data())
                dispatch(setAvailable(true))
                dispatch(setHighScores(highScores))
            })
    },
    "Error getting high scores:")
}