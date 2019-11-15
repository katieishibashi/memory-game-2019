import React from 'react'
import styles from './MessageDisplay.scss'

class MessageDisplay extends React.Component {
  render() {
    const mode = this.props.mode;
    const levelButtonClick = this.props.levelButtonClick;
    const resetButtonClick = this.props.resetButtonClick;
    let display
    function StartScreen() {
      return (
        <div>
          <h1>Welcome to the game! Select your level.</h1>
          <div className={styles.buttonContainer}>
          <button onClick={() => levelButtonClick("easy")}>Easy</button>&nbsp;
          <button onClick={() => levelButtonClick("hard")}>Hard</button>
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
      display =  <StartScreen />
    } else {
      display = <EndScreen />
    }
    return <div class={styles.messageScreen}>{display}</div>
  }
}

export default MessageDisplay
