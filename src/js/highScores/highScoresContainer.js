import {connect} from 'react-redux'
import HighScoreComponent from './highScoresComponent'
import {populateNavArray} from '../actions/utilActions'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
  home: populateNavArray(ownProps.home, dispatch)
})

// Container for high scores component
const HighScoreContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HighScoreComponent)

export default HighScoreContainer
