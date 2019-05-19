/**
 * @license MIT
 * @version 1.1.0
 * @author Leonardo Quevedo
 * @description Adaptive navbar.
 */

import React from 'react'
import { connect } from 'react-redux'

import deviceEnabled from '../../assets/vectors/device-enabled.svg'
import deviceDisabled from '../../assets/vectors/device-disabled.svg'

import './MasterToggle.scss'
import { toggleDevice } from '../../actions/device'

class MasterToggle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { device } = this.props
    const isEnabled = device && device.isEnabled
    return (
      <div className={`app-master-toggle ${isEnabled ? 'toggle-enabled' : 'toggle-disabled'}`}>
      {/* eslint-disable-next-line */}
        <a
          href=""
          className="app-master-toggle__button"
          onClick={() => {
            this.props.toggleDevice()
          }}>
          <img
            className="app-master-toggle__icon"
            src={isEnabled ? deviceEnabled : deviceDisabled}
            alt={isEnabled ? 'Clique para desativar' : 'Clique para ativar'}
          />
          <div className="app-master-toggle__ripple" />
          <div className="app-master-toggle__ripple" />
          <div className="app-master-toggle__ripple" />
        </a>
        <div className="app-master-toggle__content">
          <div className="app-master-toggle__title">{isEnabled ? 'Ativado' : 'Desativado'}</div>
          <div className="app-master-toggle__description">
            {isEnabled ? 'Para desativar clique acima' : 'Para ativar clique acima'}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  device: state.device.connected
})

const mapDispatchToProps = dispatch => ({
  toggleDevice: () => dispatch(toggleDevice())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MasterToggle)
