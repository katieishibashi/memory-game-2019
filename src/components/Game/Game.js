import React from 'react'
import PropTypes from 'prop-types'
import Card from '../Card/Card'
import MessageDisplay from '../MessageDisplay/MessageDisplay'

import styles from './Game.scss'

class Game extends React.Component {
  constructor() {
    super()
    this.state = { mode: 'start', cards: [], activeCards: [] }
    this.typeButtonClick = this.typeButtonClick.bind(this)
    this.resetButtonClick = this.resetButtonClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.numberOfCards = 8
    this.numberOfMatches = 0
    this.isBoardUnclickable = false
  }

  typeButtonClick(type) {
    console.log('Level button clicked')
    this.getData(type)
  }
  resetButtonClick(text) {
    this.setState({ mode: 'start', cards: [] })
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

  handleClick(e, id, index) {
    console.log('in handle click', id, index)
    // return if we already have two cards selected
    if (this.state.activeCards.length >= 2) {
      return
    }
    // temporarily make the board unclickable until the card flips
    // this.isBoardUnclickable = true

    // Flip the card
    this.setState(
      prevState => {
        prevState.cards[index].isFlipped = !prevState.cards[index].isFlipped
        return prevState
      },
      () => {
        this.isBoardUnclickable = false
        console.log('callback should have fired', this.isBoardUnclickable)
      }
    )

    // Store the data
    this.state.activeCards.push({ id, index })

    // If this is the second card, check for a match
    if (this.state.activeCards.length === 2) {
      // Increment their score if there's a match
      if (this.state.activeCards[0].id === this.state.activeCards[1].id) {
        this.numberOfMatches = this.numberOfMatches + 1
        this.setState({ activeCards: [] })
        if (this.numberOfMatches === this.numberOfCards) {
          this.state.mode = 'end'
        }
      } else {
        // Otherwise, flip the cards back
        // Wait a second so we actually see both cards
        setTimeout(() => {
          this.setState(prevState => {
            prevState.activeCards = []
            prevState.cards[this.state.activeCards[0].index].isFlipped = false
            prevState.cards[this.state.activeCards[1].index].isFlipped = false
            return prevState
          }, () => (this.isBoardUnclickable = false))
        }, 1000)
      }
    }
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
        <div
          className={[styles.cardsContainer, this.isBoardUnclickable && styles.unClickable].join(
            ' '
          )}
        >
          {mode === 'playing' &&
            cards.map((card, index) => (
              <Card
                img={card.img}
                key={`card${index}`}
                index={index}
                id={card.id}
                isFlipped={card.isFlipped}
                handleClick={this.handleClick}
              />
            ))}
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
