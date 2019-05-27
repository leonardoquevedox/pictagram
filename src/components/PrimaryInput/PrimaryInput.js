/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
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
    this.inputRef = React.createRef()
    this.id = `input-${Date.now()}`
  }

  scrollTop() {
    const inputOffset = this.inputRef.getBoundingClientRect().top
    const page = document.querySelector('.page-current .page-content')
    page.scrollTo({ top: page.scrollTop + inputOffset, left: 0, behavior: 'smooth' })
  }

  addPaddingBottom() {
    const page = document.querySelector('.page-current .page-content')
    page.style['padding-bottom'] = '100px'
  }

  removePaddingBottom() {
    const page = document.querySelector('.page-current .page-content')
    page.style = {}
  }

  render() {
    return (
    <ListInput {...this.props} className="input-primary" colorTheme="blue" outline>
      {this.props.children}
    </ListInput>)
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
