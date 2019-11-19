import React from 'react'
import PropTypes from 'prop-types'
import styles from './Card.scss'

const Card = ({ img, isFlipped, handleClick, id, index }) => (
  <div
    id={id}
    index={index}
    className={[styles.card, isFlipped && styles.flipped].join(' ')}
    onClick={e => handleClick(e, id, index)}
    role="option"
    aria-selected="false"
    tabIndex={id}
  >
    <div className={styles.cardContent}>
      <div className={styles.cardBack} />
      <div className={styles.cardFront} style={{ backgroundImage: `url(${img})` }} />
    </div>
  </div>
)

Card.propTypes = {
  img: PropTypes.string,
  isFlipped: PropTypes.bool,
  handleClick: PropTypes.func,
  id: PropTypes.string,
  index: PropTypes.number,
}

export default Card
