import {connect} from 'react-redux'
import GameResultsComponent from './gameResultsComponent'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

const GameResultContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameResultsComponent)

export default GameResultContainer