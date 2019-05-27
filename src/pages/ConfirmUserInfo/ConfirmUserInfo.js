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
import isEmpty from 'validator/lib/isEmpty'
import VMasker from 'vanilla-masker'
import moment from 'moment-mini'

import { readProfile, updateProfile } from '../../actions/user'

import arrowIcon from '../../assets/vectors/arrow.svg'

import PrimaryButton from '../../components/PrimaryButton'
import PrimaryInput from '../../components/PrimaryInput'
import Navbar from '../../components/Navbar'
import Step from '../../components/Step'
import AddressForm from '../../components/AddressForm'

import './ConfirmUserInfo.scss'

class ConfirmUserInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: true,
      isLoading: false,
      user: {
        name: '',
        email: '',
        rg: '',
        cpf: '',
        displayCpf: '',
        cep: '',
        displayCep: '',
        street: '',
        streetNumber: '',
        complement: '',
        city: '',
        state: '',
        cnhPhoto: '',
        displayBirthdate: ''
      }
    }
  }

  componentWillMount() {
    this.readProfile()
  }

  componentDidMount() {}

  readProfile() {
    this.props
      .readProfile()
      .then(() => {
        const { user } = this.props
        this.setState({
          user: {
            ...user,
            name: user.name || '',
            email: user.email || '',
            rg: user.rg || '',
            cpf: user.cpf || '',
            cep: user.cep || '',
            displayCep: VMasker.toPattern(`${user.cep}`, '99999-999') || '',
            street: user.street || '',
            streetNumber: user.streetNumber || '',
            complement: user.complement || '',
            city: user.city || '',
            state: user.state || '',
            cnhPhoto: user.cnhPhoto || '',
            displayBirthdate: moment(user.birthdate).format('DD/MM/YYYY'),
            displayCpf: VMasker.toPattern(user.cpf, '999.999.999-99')
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

  isFormValid() {
    const { user } = this.state
    return (
      !isEmpty(user.displayCep) &&
      !isEmpty(user.street) &&
      !isEmpty(user.streetNumber) &&
      !isEmpty(user.city) &&
      !isEmpty(user.state)
    )
  }

  onSubmit() {
    const { user } = this.state
    this.setState({ isLoading: true })
    this.props
      .updateProfile({ ...user })
      .then(() => {
        this.$f7router.navigate({ name: 'IntroduceDriverLicense' })
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
    const { user } = this.state
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
        <Step />
        <Step />
      </div>
    )

    const renderSpinner = () => (
      <div className="confirm-user-info-page__content--loading">
        <Preloader color="blue" className="confirm-user-info-page__preloader" />
        <p>Carregando...</p>
      </div>
    )

    const renderForm = () => (
      <List className="confirm-user-info-page__form">
        <PrimaryInput value={user.name} label="Nome completo" type="text" disabled />
        <PrimaryInput
          value={user.displayBirthdate}
          disabled
          placeholder="dd/mm/aaaa"
          label="Data de nascimento"
          type="text"
        />
        <PrimaryInput value={user.rg} placeholder="9999999999" label="RG" type="tel" disabled />
        <PrimaryInput
          value={user.displayCpf}
          placeholder="999.999.999-99"
          label="CPF"
          type="tel"
          disabled
        />
        <AddressForm
          values={user}
          onChange={address => this.setState({ user: { ...user, ...address } })}
          disabled
        />
        <PrimaryButton
          disabled={!this.isFormValid()}
          isLoading={this.state.isLoading}
          onClick={() => {
            this.onSubmit()
          }}>
          Próximo
        </PrimaryButton>
      </List>
    )

    return (
      <Page className="confirm-user-info-page">
        <Helmet title={pageTitle} />
        <Navbar className="confirm-user-info-page__navbar">
          <div className="app-navbar__left">{renderBackButton()}</div>
          <div className="app-navbar__center app-navbar__title">Dados pessoais</div>
          <div className="app-navbar__right">{renderSteps()}</div>
        </Navbar>
        <div className="confirm-user-info-page__content">
          <div className="confirm-user-info-page__intro">
            Vamos precisar da sua confirmação sobre algumas informações
          </div>
          {this.state.isFetching ? renderSpinner() : renderForm()}
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.profile
})

const mapDispatchToProps = dispatch => ({
  readProfile: () => dispatch(readProfile()),
  updateProfile: data => dispatch(updateProfile(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmUserInfo)
