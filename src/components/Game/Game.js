import React from 'react'
import PropTypes from 'prop-types'
import CardsContainer from '../CardsContainer/CardsContainer'
import MessageDisplay from '../MessageDisplay/MessageDisplay'

import styles from './Game.scss'

class Game extends React.Component {
  constructor() {
    super()
    this.state = { mode: 'start' }
    this.levelButtonClick = this.levelButtonClick.bind(this)
    this.resetButtonClick = this.resetButtonClick.bind(this)
  }
  levelButtonClick(level) {
    alert("Level button clicked");
  }
  resetButtonClick(text) {
    alert("reset button clicked");
  }

  render() {
    return (
      <div className={styles.mainContainer}>
        {this.state.mode === 'playing' && <CardsContainer />}
        {this.state.mode !== 'playing' && (
          <MessageDisplay
            mode={this.state.mode}
            levelButtonClick={this.levelButtonClick}
            resetButtonClick={this.resetButtonClick}
          />
        )}
        <button
          onClick={() => this.resetButtonClick()}
          className={`${styles.button} ${styles.resetButton}`}
        >
          Reset
        </button>
      </div>
    )
  }
}

Game.PropTypes = {
  mode: PropTypes.oneOf(['start', 'playing', 'end']),
}
export default Game
