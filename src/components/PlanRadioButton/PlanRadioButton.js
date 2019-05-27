import React from 'react';

import { connect } from 'react-redux'

import './PlanRadioButton.scss'

class PlanRadioButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { checked, id, name, price, title, value } = this.props

    return (
      <div className="app-radio">
        <input className="app-radio__toggle" id={ id } type="radio" name={ name } value={ value } checked={ checked } />
        <label className="app-radio__outline" htmlFor={ id }>
          <div className="app-radio__btn"></div>
          <div className="app-radio__content">
            <h1 className="app-radio__content__title">{ title }</h1>
            <h2 className="app-radio__content__price">R$ { price }</h2>
          </div>
        </label>
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
)(PlanRadioButton)
