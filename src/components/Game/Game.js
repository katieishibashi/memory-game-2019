import React from 'react'
import PropTypes from 'prop-types'
import CardsContainer from '../CardsContainer/CardsContainer'
import MessageDisplay from '../MessageDisplay/MessageDisplay'

import styles from './Game.scss'

class Game extends React.Component {
  constructor() {
    super()
    this.state = { mode: 'start', cards: {} }
    this.typeButtonClick = this.typeButtonClick.bind(this)
    this.resetButtonClick = this.resetButtonClick.bind(this)
  }
  typeButtonClick(level) {
    alert('Level button clicked')
    this.getStockPhotos(8)
  }
  resetButtonClick(text) {
    alert('reset button clicked')
  }
  // Pull in stock photos to do matching with
  getData(type) {
    fetch(`https://source.unsplash.com/250x300/?random`)
      .then(response => {
        console.log(response);
      })
      .catch(() => {
        console.warn('failed to get data')
      })
  }

  // componentDidMount() {}

  render() {
    return (
      <div className={styles.mainContainer}>
        {this.state.mode === 'playing' && <CardsContainer />}
        {this.state.mode !== 'playing' && (
          <MessageDisplay
            mode={this.state.mode}
            typeButtonClick={this.typeButtonClick}
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
