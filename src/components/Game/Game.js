import React from 'react'
import PropTypes from 'prop-types'
import Card from '../Card/Card'
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
    console.log('Level button clicked')
    this.getData(type)
  }
  resetButtonClick(text) {
    console.log('reset button clicked')
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
    // return it as an array so we can grab the index later
    return [...imageSet]
  }

  shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = deck[i]
      deck[i] = deck[j]
      deck[j] = temp
    }
    return deck
  }

  mapDataToCards(images) {
    var images = this.chooseRandomImages(images)
    // Use the image urls to generate our cards data
    const cardsArr = []
    images.forEach((image, index) => {
      cardsArr.push(
        { img: image, id: `card${index}`, isFlipped: false },
        { img: image, id: `card${index}`, isFlipped: false }
      )
    })
    this.setState({ cards: this.shuffle(cardsArr), mode: 'playing' })
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
    const { cards, mode } = this.state
    return (
      <div className={styles.mainContainer}>
        <MessageDisplay
          mode={mode}
          typeButtonClick={this.typeButtonClick}
          resetButtonClick={this.resetButtonClick}
        />
        <div className={styles.cardsContainer}>
          {mode === 'playing' &&
            cards.map((card, index) => {
              console.log(card.img)
              return (
                <Card img={card.img} key={`card${index}`} id={card.id} isFlipped={card.isFlipped} />
              )
            })}
        </div>
      </div>
    )
  }
}

Game.PropTypes = {
  mode: PropTypes.oneOf(['start', 'playing', 'end']),
  cards: PropTypes.array,
}
export default Game
