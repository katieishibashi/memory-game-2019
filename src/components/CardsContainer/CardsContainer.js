import Timer from '../Timer/Timer'
import React from 'react'

class CardsContainer extends React.Component {
  render() {
    return (
      <div>
        YO CARDS CONTAINER
        {/* {this.props.cards} */}
        <Timer />
      </div>
    )
  }
}

CardsContainer.PropTypes = {
  cards: PropTypes.array,
}

export default CardsContainer
