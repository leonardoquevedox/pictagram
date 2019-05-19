/**
 * @license MIT
 * @version 1.1.0
 * @author Leonardo Quevedo
 * @description Adaptive navbar.
 */

import React from 'react'
import { Button } from 'framework7-react'

import { connect } from 'react-redux'

import './SecondaryButton.scss'

class SecondaryButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Button className="button-secondary" color="secondary" {...this.props}>
        {this.props.children}
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
)(SecondaryButton)
