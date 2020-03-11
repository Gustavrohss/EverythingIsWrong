import {connect} from 'react-redux'
import GameResultsComponent from './gameResultsComponent'
import {exitLobby} from '../actions/gameSessionActions'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => {
  const [homeLabel, homeCallback] = ownProps.home
  return {
    home: [
      homeLabel,
      () => {
          homeCallback()
          dispatch(exitLobby())
    }]
  }
}

const GameResultContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameResultsComponent)

export default GameResultContainer
