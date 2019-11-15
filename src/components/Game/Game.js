import React from 'react'
import PropTypes from 'prop-types'
import CardsContainer from '../CardsContainer/CardsContainer'
import MessageDisplay from '../MessageDisplay/MessageDisplay'

import styles from './Game.scss'

class Game extends React.Component {
  constructor() {
    super()
    this.state = { mode: 'start', cards: [] }
    this.typeButtonClick = this.typeButtonClick.bind(this)
    this.resetButtonClick = this.resetButtonClick.bind(this)
    this.numberOfCards = 8
  }

  typeButtonClick(type) {
    alert('Level button clicked')
    this.getData(type)
  }
  resetButtonClick(text) {
    alert('reset button clicked')
  }

  chooseRandomImages(images) {
    // Select 8 random images
    const imageSet = new Set()
    while (imageSet.size < this.numberOfCards) {
      // Select a random image location
      const imageLocation = Math.floor(Math.random() * Math.floor(images.length))
      // Add the image url to the set we will use to generate cards
      imageSet.add(images[imageLocation])
    }
    //return it as an array so we can grab the index later
    return [...imageSet]
  }

  mapDataToCards(images) {
    var images = this.chooseRandomImages(images)
    // Use the image urls to generate our cards data
    var cardsArr = [];
    images.forEach((image, index) =>{
      cardsArr.push({ img: image, id: `card${index}`, flipped: false }) 
    })
    console.log(cardsArr)
  }

  // Pull in the stock photos we will use on the cards
  getData(type) {
    fetch(`data/${type}.json`)
      .then(response => response.json())
      .then(data => {
        // Work with JSON data here
        this.mapDataToCards(data.images)
      })
      .catch(() => {
        console.warn('failed to get data')
      })
  }

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
