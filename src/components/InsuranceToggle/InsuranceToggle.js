/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description Adaptive navbar.
 */

import React from 'react'
import { connect } from 'react-redux'

import deviceEnabled from '../../assets/vectors/device-enabled.svg'
import deviceDisabled from '../../assets/vectors/device-disabled.svg'

import './InsuranceToggle.scss'
import { toggleInsurance } from '../../actions/insurance'

class InsuranceToggle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { isEnabled } = this.props
    return (
      <div className={`app-insurance-toggle ${isEnabled ? 'toggle-enabled' : 'toggle-disabled'}`}>
        {/* eslint-disable-next-line */}
        <a
          href=""
          className="app-insurance-toggle__button"
          onClick={() => {
            this.props.toggleInsurance()
          }}>
          <img
            className="app-insurance-toggle__icon"
            src={isEnabled ? deviceEnabled : deviceDisabled}
            alt={isEnabled ? 'Clique para desativar' : 'Clique para ativar'}
          />
          <div className="app-insurance-toggle__ripple" />
          <div className="app-insurance-toggle__ripple" />
          <div className="app-insurance-toggle__ripple" />
        </a>
        <div className="app-insurance-toggle__content">
          <div className="app-insurance-toggle__title">{isEnabled ? 'Ativado' : 'Desativado'}</div>
          <div className="app-insurance-toggle__description">
            {isEnabled
              ? 'Aperte no botão acima se quiser desativar o seguro.'
              : 'Aperte no botão acima para ativar o seguro.'}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isEnabled: state.insurance.isEnabled
})

const mapDispatchToProps = dispatch => ({
  toggleInsurance: () => dispatch(toggleInsurance())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsuranceToggle)
