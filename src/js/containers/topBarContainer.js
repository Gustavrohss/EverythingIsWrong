import { connect } from 'react-redux'
import TopBarComponent from "../components/topBarComponent"
import { leaveLobby } from '../actions/gameSessionActions'
import { populateNavArray } from '../actions/utilActions'
import { getHighScores } from '../actions/highScoresActions'
import {getLoggedIn} from '../selectors/gameSessionSelectors'


const mapStateToProps = (state, ownProps) => ({
  loggedIn: getLoggedIn(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  home: populateNavArray(ownProps.home, dispatch, () => {
    dispatch(leaveLobby()) // stop listening to database events
  }),
  about: populateNavArray(ownProps.about, dispatch, () => {
    dispatch(leaveLobby()) // stop listening to database events
  }),
  highScores: populateNavArray(ownProps.highScores, dispatch, () => {
    dispatch(getHighScores())
    dispatch(leaveLobby()) // stop listening to database events
  })
})

const TopBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TopBarComponent)

export default TopBarContainer
