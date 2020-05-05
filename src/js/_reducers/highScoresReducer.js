import {
    SET_AVAILABLE,
    SET_HIGHSCORES
} from "../actions/highScoresActions"

const highScoresReducer = function(state = {
    available: false,
    highScores: []
}, action) {
    switch(action.type) {

        case SET_AVAILABLE:
            return Object.assign({}, state, {
                available: action.available
            })

        case SET_HIGHSCORES:
            return Object.assign({}, state, {
                highScores: action.highScores
            })

        default:
            return state
    }
}

export default highScoresReducer