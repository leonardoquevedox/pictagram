/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description User information page.
 */

import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Page, Link, List } from 'framework7-react'

import { addDevice } from '../../actions/device'

import arrowIcon from '../../assets/vectors/arrow.svg'

import tip01 from '../../assets/vectors/sync-tip-01.svg'
import tip02 from '../../assets/vectors/sync-tip-02.svg'
import tip03 from '../../assets/vectors/sync-tip-03.svg'

import PrimaryButton from '../../components/PrimaryButton'
import PrimaryInput from '../../components/PrimaryInput'
import Navbar from '../../components/Navbar'
import Step from '../../components/Step'

import './AddDevice.scss'

class AddDevice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.setState({
      device: {
        label: ''
      }
    })
  }

  onSubmit() {
    const { device } = this.state
    this.setState({ isLoading: true })
    this.props
      .addDevice({
        ...this.props.device,
        ...device,
        uuid: this.props.device.id,
        id: undefined
      })
      .then(data => {
        console.log(data)
        this.$f7router.navigate({ name: 'ConfirmUserInfo' })
      })
      .catch(e => {
        console.log(e)
        this.$f7.dialog.alert(
          'Por favor, verifique as informações preenchidas e tente novamente.',
          'Houve uma falha na operação'
        )
      })
      .then(() => {
        this.setState({ isLoading: false })
      })
  }

  canGoBack() {
    const { f7router } = this.props
    const { history } = f7router
    return history.length > 0
  }

  render() {
    const pageTitle = 'Argo Instant: Cadastro'
    const { device } = this.state
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
        <Step done />
      </div>
    )

    const tips = [
      {
        picture: tip01,
        text:
          'O seu XXXXXX precisa do GPS e do Bluetooh para funcionar. Mantenha sempre ativados.'
      },
      {
        picture: tip02,
        text:
          'Mantenha sempre o seu XXXXXX no veículo cadastrado. Isso protege você de problemas com o seu seguro.'
      },
      {
        picture: tip03,
        text:
          'Seu XXXXXX não está funcionando bem? Entre em contato com a gente.'
      }
    ]

    return (
      <Page className="add-device-page">
        <Helmet title={pageTitle} />
        <Navbar className="add-device-page__navbar">
          <div className="app-navbar__left">{renderBackButton()}</div>
          <div className="app-navbar__center app-navbar__title">Device</div>
          <div className="app-navbar__right">{renderSteps()}</div>
        </Navbar>
        {device && (
          <div>
            <div className="add-device-page__content">
              <div className="add-device-page__title">Dê um nome para seu device</div>
              <List className="add-device-page__form">
                <PrimaryInput
                  value={this.state.device.label}
                  onChange={e => {
                    this.setState({ device: { ...device, label: e.target.value } })
                  }}
                  label="Nome do device"
                  className="add-device-page__form__input"
                  type="text"
                />
                <div className="add-device-page__tips">
                  {tips.map(tip => (
                    <div key={Math.random()} className="add-device-page__tip">
                      <img className="add-device-page__tip__picture" src={tip.picture} alt="" />
                      <div className="add-device-page__tip__label"> {tip.text} </div>
                    </div>
                  ))}
                </div>
              </List>
            </div>
            <div className="add-device-page__footer">
              <PrimaryButton
                disabled={!device || !device.label}
                isLoading={this.state.isLoading}
                onClick={() => {
                  this.onSubmit()
                }}>
                Concluir
              </PrimaryButton>
            </div>
          </div>
        )}
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  device: state.device.selected,
  user: state.user.profile
})

const mapDispatchToProps = dispatch => ({
  addDevice: device => dispatch(addDevice(device))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDevice)
