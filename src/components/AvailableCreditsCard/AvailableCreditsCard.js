/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description Adaptive navbar.
 */

import React from 'react'
import { connect } from 'react-redux'

import Card from '../Card'
import creditsIcon from '../../assets/vectors/home-credits-icon.svg'

import './AvailableCreditsCard.scss'

class AvailableCreditsCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { value, full, onClick } = this.props

    return (
      <Card full={full}>
        <div className={`app-available-credits-card${full ? ' app-available-credits-card--full' : ''}`} onClick={onClick}>
          <img className="app-available-credits-card__icon" src={creditsIcon} alt="" />
          <div className="app-available-credits-card__content">
            <div className="app-available-credits-card__title">{`Créditos${full ? ' restantes' : ''}`}</div>
            <div className="app-available-credits-card__value">{value}</div>
          </div>
        </div>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  ui: state.ui
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvailableCreditsCard)
