/**
 * @license MIT
 * @version 1.1.0
 * @author Leonardo Quevedo
 * @description Adaptive navbar.
 */

import React from 'react'
import { Checkbox, Row, Col } from 'framework7-react'

import { connect } from 'react-redux'

import './CheckboxInput.scss'

class CheckboxInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div
        {...this.props}
        className={`checkbox-input ${this.props.checked ? 'checked' : ''}  ${this.props.transparent ? 'transparent' : ''}`}
        disabled={this.props.disabled}>
        <Row>
          <Col width={10}>
            <Checkbox color="orange" checked={this.props.checked} />
          </Col>
          <Col width={90}>{this.props.children}</Col>
        </Row>
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
)(CheckboxInput)
