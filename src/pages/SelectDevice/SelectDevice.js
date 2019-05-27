/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description User information page.
 */

import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Page, Link, Button } from 'framework7-react'

import { selectDevice } from '../../actions/device'

import arrowIcon from '../../assets/vectors/arrow.svg'

import PrimaryButton from '../../components/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton'
import Navbar from '../../components/Navbar'
import Step from '../../components/Step'

import './SelectDevice.scss'

class SelectDevice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  onSelect(device) {
    this.props.selectDevice(device)
  }

  onConfirm() {
    this.setState({ isLoading: true })
    this.$f7router.navigate({ name: 'AddDevice' })
    this.setState({ isLoading: false })
  }

  canGoBack() {
    const { f7router } = this.props
    const { history } = f7router
    return history.length > 0
  }

  render() {
    const pageTitle = 'Argo Instant: Cadastro'
    const { devices, selected } = this.props
    console.log(devices)
    const renderBackButton = () =>
      this.canGoBack() && (
        <Link
          style={{ verticalAlign: 'middle' }}
          onClick={() => {
            this.$f7router.back()
          }}>
          <img src={arrowIcon} alt="Voltar" />
        </Link>
      )

    const renderSteps = () => (
      <div>
        <Step done />
        <Step done />
        <Step />
      </div>
    )

    return (
      <Page className="select-device-page">
        <Helmet title={pageTitle} />
        <Navbar className="select-device-page__navbar">
          <div className="app-navbar__left">{renderBackButton()}</div>
          <div className="app-navbar__center app-navbar__title">Device</div>
          <div className="app-navbar__right">{renderSteps()}</div>
        </Navbar>
        <div className="select-device-page__content">
          <div>
            <div className="select-device-page__intro__title">Então vamos sincronizar o seu NNNNN?</div>
            <div className="select-device-page__intro__content">
              Selecione o seu XXXXX na lista abaixo. Mas tenha certeza de que é o seu mesmo. Não será possível alterar depois.
            </div>
            <div className="select-device-page__list">
              { selected && devices &&
                devices.length > 0 &&
                devices.map(device => (
                  <Button
                    className={`select-device-page__list__item ${
                      device.id === selected.id ? 'selected' : ''
                    }`}
                    key={device.id}
                    onClick={() => this.onSelect(device)}>
                    {device.name || device.id}
                  </Button>
                ))}
            </div>
          </div>

        </div>
        <div className="select-device-page__footer">
            <PrimaryButton
              disabled={!selected || !selected.id}
              isLoading={this.state.isLoading}
              onClick={() => {
                this.onConfirm()
              }}>
              Sincronizar
            </PrimaryButton>
            <SecondaryButton
              onClick={() => {
                this.$f7router.back()
              }}>
              Não estou encontrando meu device
            </SecondaryButton>
          </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  devices: state.device.nearby,
  selected: state.device.selected
})

const mapDispatchToProps = dispatch => ({
  selectDevice: device => dispatch(selectDevice(device))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectDevice)
