/**
 * @license MIT
 * @version 1.1.0
 * @author Leonardo Quevedo
 * @description Adaptive navbar.
 */

import React from 'react'
import { connect } from 'react-redux'


import step from '../../assets/vectors/step.svg'
import stepFilled from '../../assets/vectors/step-filled.svg'

import './Step.scss'

class Step extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <img className="app-step" src={this.props.done ? stepFilled : step} alt={this.props.alt} />
    )
  }
}

const mapStateToProps = state => ({
  ui: state.ui
})

const mapDispatchToProps = dispatch => ({
  
  
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Step)
