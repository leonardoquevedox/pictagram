/**
 * @license MIT
 * @version 1.1.0
 * @author Leonardo Quevedo
 * @description Adaptive navbar.
 */

import React from 'react'
import { ListInput } from 'framework7-react'

import { connect } from 'react-redux'

import './PrimaryInput.scss'

class PrimaryInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <ListInput
        {...this.props}
        className="input-primary"
        colorTheme="orange"
        floatingLabel
        outline
      />
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
)(PrimaryInput)
