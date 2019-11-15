import React from 'react'
import PropTypes from 'prop-types'
import styles from './Card.scss'

const Card = ({ img, isFlipped, handleClick, id }) => (
  <div
    id={id}
    className={[styles.card, isFlipped && styles.isFlipped].join(' ')}
    onClick={e => handleClick(e, id)}
    role="option"
    aria-selected="false"
    tabIndex={id}
  >
    <div className={styles.cardContent}>
      <div className={styles.cardBack} />
      <div className={styles.cardFront}>{img}</div>
    </div>
  </div>
)

Card.propTypes = {
  img: PropTypes.string,
  isFlipped: PropTypes.bool,
  handleClick: PropTypes.func,
  id: PropTypes.number,
}

export default Card
