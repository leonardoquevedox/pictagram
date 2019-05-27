/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description User controller.
 */

import React from 'react'
import { connect } from 'react-redux'

import Main from './pages/Main'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <Main />
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
