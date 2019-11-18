import React from 'react'
import styles from './MessageDisplay.scss'
import Timer from '../Timer/Timer'

class MessageDisplay extends React.Component {
  render() {
    const mode = this.props.mode
    const typeButtonClick = this.props.typeButtonClick
    const resetButtonClick = this.props.resetButtonClick
    const secondsElapsed = this.props.secondsElapsed
    let display
    function StartScreen() {
      return (
        <div>
          <h1>Welcome to the game! Select a type.</h1>
          <div className={styles.buttonContainer}>
            <button onClick={() => typeButtonClick('cats')}>Cats</button>&nbsp;
            <button onClick={() => typeButtonClick('dogs')}>Dogs</button>&nbsp;
            <button onClick={() => typeButtonClick('pie')}>Pie</button>
          </div>
        </div>
      )
    }
    function PlayingScreen() {
      return (
        <div>
          <h1>Flip over cards to find a match.</h1>
          <Timer secondsElapsed={secondsElapsed}/>
          <div className={styles.buttonContainer}>
            <button onClick={resetButtonClick}>RESET</button>
          </div>
        </div>
      )
    }
    function EndScreen() {
      return (
        <div>
          <h1>You have finished the game. You are awesome.</h1>
          <div className={styles.buttonContainer}>
            <button onClick={resetButtonClick}>RESET</button>
          </div>
        </div>
      )
    }
    if (mode === 'start') {
      display = <StartScreen />
      // Reset the timer
    } else if (mode === 'playing') {
      display = <PlayingScreen />
    } else {
      display = <EndScreen />
    }
    return <div className={styles.messageScreen}>{display}</div>
  }
}

export default MessageDisplay
