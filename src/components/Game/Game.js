import React from 'react'
import PropTypes from 'prop-types'
import CardsContainer from '../CardsContainer/CardsContainer'
import MessageDisplay from '../MessageDisplay/MessageDisplay'

import styles from './Game.scss'

class Game extends React.Component {
  constructor() {
    super()
    this.state = { mode: 'start' }
  }
  render() {
    return <div className={styles.mainContainer}>
      {this.state.mode === 'playing' && <CardsContainer />}
      {this.state.mode !== 'playing' && <MessageDisplay mode={this.state.mode} />}
      </div>
  }
}

Game.PropTypes = {
  mode: PropTypes.oneOf(['start', 'playing', 'end']),
}
export default Game
