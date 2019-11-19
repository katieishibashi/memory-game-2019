import React from 'react'
import PropTypes from 'prop-types'
import Card from '../Card/Card'
import MessageDisplay from '../MessageDisplay/MessageDisplay'

import styles from './Game.scss'

class Game extends React.Component {
  constructor() {
    super()
    this.state = { mode: 'start', cards: [], secondsElapsed: 0 }
    this.typeButtonClick = this.typeButtonClick.bind(this)
    this.resetButtonClick = this.resetButtonClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.numberOfCards = 8
    this.activeCards = []
    this.numberOfMatches = 0
  }

  typeButtonClick(type) {
    this.getData(type)
  }
  resetButtonClick() {
    this.setState({ mode: 'start', cards: [], secondsElapsed: 0 })
    this.activeCards = []
    this.numberOfMatches = 0
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
    for (let i = deck.length - 1; i > 0; i += 1) {
      const j = Math.floor(Math.random() * i)
      const temp = deck[i]
      deck[i] = deck[j]
      deck[j] = temp
    }
    return deck
  }

  mapDataToCards(images) {
    const imageArr = this.chooseRandomimageArr(images)
    // Use the image urls to generate our cards data
    const cardsArr = []
    imageArr.forEach((image, index) => {
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
    // return if we already have two cards selected
    if (this.activeCards.length >= 2) {
      return
    }
    // Flip the card
    this.setState(prevState => {
      prevState.cards[index].isFlipped = !prevState.cards[index].isFlipped
      return prevState
    })


    // Return if they've just clicked the same card twice
    if (this.activeCards[0] && index === this.activeCards[0].index) {
      return
    } 
      // Otherwise, store the data
      this.activeCards.push({ id, index })
    

    // If this is the second card, check for a match
    if (this.activeCards.length === 2) {
      // Increment their score if there's a match
      if (this.activeCards[0].id === this.activeCards[1].id) {
        this.numberOfMatches = this.numberOfMatches + 1
        this.activeCards = [];
        if (this.numberOfMatches === this.numberOfCards) {
          this.state.mode = 'end'
        }
      } else {
        // Otherwise, flip the cards back
        // Wait a second so we actually see both cards
        setTimeout(() => {
          this.setState(prevState => {
            prevState.cards[this.activeCards[0].index].isFlipped = false
            prevState.cards[this.activeCards[1].index].isFlipped = false
            this.activeCards = [];
            return prevState
          })
        }, 1000)
      }
    }
  }

  // Logic for the timer

  componentDidUpdate() {
    // Set the interval if we don't already have one and we're in playing mode
    if (!this.interval && this.state.mode === 'playing') {
      this.interval = setInterval(this.tick.bind(this), 1000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  tick() {
    this.setState({
      secondsElapsed: this.state.secondsElapsed + 1,
    })
  }

  render() {
    const { cards, mode, secondsElapsed } = this.state
    return (
      <div className={styles.mainContainer}>
        <MessageDisplay
          mode={mode}
          secondsElapsed={secondsElapsed}
          typeButtonClick={this.typeButtonClick}
          resetButtonClick={this.resetButtonClick}
          secondsElapsed={secondsElapsed}
        />

        <div className={styles.cardsContainer}>
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
  secondsElapsed: PropTypes.number,,
}
export default Game
