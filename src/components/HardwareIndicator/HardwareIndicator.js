/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description Adaptive navbar.
 */

import React from 'react'
import { connect } from 'react-redux'

import './HardwareIndicator.scss'

class HardwareIndicator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { active, label } = this.props

    return (
      <div className="app-hardware-indicator" {...this.props}>
        <div className="app-hardware-indicator__light-container">
          <div className={`app-hardware-indicator__outer-light ${active ? 'hw-active' : ''}`} />
          <div className={`app-hardware-indicator__inner-light ${active ? 'hw-active' : ''}`} />
        </div>
        <span className="app-hardware-indicator__label">{label}</span>
      </div>
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
)(HardwareIndicator)
