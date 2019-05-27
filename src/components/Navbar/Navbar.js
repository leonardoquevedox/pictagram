/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description Adaptive navbar.
 */

import React from 'react'
import { connect } from 'react-redux'


import './Navbar.scss'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <article className="app-navbar">{this.props.children}</article>
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
)(Navbar)
