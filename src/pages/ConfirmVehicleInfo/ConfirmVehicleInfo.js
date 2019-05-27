/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description User information page.
 */

import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Page, List, Link, Preloader } from 'framework7-react'

import { readVehicle } from '../../actions/vehicle'

import arrowIcon from '../../assets/vectors/arrow.svg'

import PrimaryButton from '../../components/PrimaryButton'
import PrimaryInput from '../../components/PrimaryInput'
import Navbar from '../../components/Navbar'
import Step from '../../components/Step'

import './ConfirmVehicleInfo.scss'

class ConfirmVehicleInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: true,
      isLoading: false,
      vehicle: {
        plate: '',
        brand: '',
        model: '',
        year: '',
        renavam: ''
      }
    }
  }

  componentWillMount() {
    this.readVehicle()
  }

  readVehicle() {
    this.props
      .readVehicle()
      .then(vehicle => {
        this.setState({
          vehicle: {
            ...vehicle,
            plate: vehicle.plate || '',
            brand: vehicle.brand || '',
            model: vehicle.model || '',
            year: vehicle.year || '',
            renavam: vehicle.renavam || ''
          }
        })
      })
      .catch(e => {
        console.log(e)
      })
      .then(() => {
        this.setState({ isFetching: false })
      })
  }

  onSubmit() {
    this.setState({ isLoading: true })
    this.$f7router.navigate({ name: 'RecordVehicleVideo' })
    this.setState({ isLoading: false })
  }

  canGoBack() {
    const { f7router } = this.props
    const { history } = f7router
    return history.length > 0
  }

  render() {
    const pageTitle = 'Argo Instant: Veículo'
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

    const renderSpinner = () => (
      <div className="automobile-info-page__content--loading">
        <Preloader color="blue" className="automobile-info-page__preloader" />
        <p>Carregando...</p>
      </div>
    )

    const renderForm = () => (
      <List className="automobile-info-page__form">
        <PrimaryInput
          value={this.state.vehicle.brand}
          label="Marca"
          type="text"
          disabled
        />
        <PrimaryInput
          value={this.state.vehicle.model}
          disabled
          label="Modelo"
          type="text"
        />
        <PrimaryInput value={this.state.vehicle.year} label="Ano" type="tel" disabled />
        <PrimaryInput value={this.state.vehicle.renavam} label="Renavam" type="tel" disabled />
        <PrimaryInput value={this.state.vehicle.plate} label="Placa" type="tel" disabled />
      </List>
    )

    return (
      <Page className="automobile-info-page">
        <Helmet title={pageTitle} />
        <Navbar className="user-info-page__navbar">
          <div className="app-navbar__left">{renderBackButton()}</div>
          <div className="app-navbar__center app-navbar__title">Dados do carro</div>
          <div className="app-navbar__right">{renderSteps()}</div>
        </Navbar>
        <div className="automobile-info-page__content">
          <div className="automobile-info-page__intro">Confirma pra gente os dados do seu carro?</div>

          {this.state.isFetching ? renderSpinner() : renderForm()}
        </div>
        <div className="automobile-info-page__footer">
          <PrimaryButton
            disabled={this.state.isFetching}
            isLoading={this.state.isLoading}
            onClick={() => {
              this.onSubmit()
            }}>
            Tudo certo, em frente
          </PrimaryButton>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  readVehicle: () => dispatch(readVehicle())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmVehicleInfo)
