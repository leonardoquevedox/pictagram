/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description Adaptive navbar.
 */

import React from 'react'
import { Button } from 'framework7-react'

import { connect } from 'react-redux'

import Loader from '../Loader'

import './PrimaryButton.scss'

class PrimaryButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Button
        {...this.props}
        className={`button-primary ${this.props.className || ''}`}
        fill
        color="primary"
        disabled={this.props.disabled || this.props.isLoading}>
        {!this.props.isLoading ? this.props.children : <Loader white />}
      </Button>
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
)(PrimaryButton)
