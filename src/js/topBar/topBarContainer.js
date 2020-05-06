import { connect } from 'react-redux'
import TopBarComponent from "./topBarComponent"
import { leaveLobby } from '../actions/gameSessionActions'
import { populateNavArray } from '../actions/utilActions'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
  home: populateNavArray(ownProps.home, dispatch, () => {
    dispatch(leaveLobby()) // stop listening to database events
  }),
  about: populateNavArray(ownProps.about, dispatch, () => {
    dispatch(leaveLobby()) // stop listening to database events
  }),
  highScores: populateNavArray(ownProps.highScores, dispatch, () => {
    dispatch(leaveLobby()) // stop listening to database events
  })
})

const TopBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TopBarComponent)

export default TopBarContainer
