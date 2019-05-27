/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description Adaptive navbar.
 */

import React from 'react'
import { connect } from 'react-redux'

import Card from '../Card'

import utilizationIcon from '../../assets/vectors/home-utilization-icon.svg'

import './UtilizationCard.scss'

class UtilizationCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { value, onClick } = this.props

    return (
      <Card>
        <div className="app-utilization-card" onClick={onClick}>
          <img className="app-utilization-card__icon" src={utilizationIcon} alt="" />
          <div className="app-utilization-card__content">
            <div className="app-utilization-card__title">Utilizações</div>
            <div className="app-utilization-card__value">{value}</div>
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
)(UtilizationCard)
