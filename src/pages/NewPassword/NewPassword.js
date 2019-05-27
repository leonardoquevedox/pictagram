import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Link, List, Page } from 'framework7-react'

import Navbar from '../../components/Navbar'
import PrimaryInput from '../../components/PrimaryInput'
import PrimaryButton from '../../components/PrimaryButton'

import { updateProfile } from '../../actions/user'

import arrowIcon from '../../assets/vectors/arrow.svg'
import './NewPassword.scss'

class NewPassword extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newPassword: '',
      confirmNewPassword: '',
      passwordMatch: false
    }

    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this)
    this.handleConfirmNewPassword = this.handleConfirmNewPassword.bind(this)
    this.passwordMatch = this.passwordMatch.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  canGoBack() {
    const { f7router } = this.props
    const { history } = f7router
    return history.length > 0
  }

  handleNewPasswordChange(value) {
    this.setState({ newPassword: value, passwordMatch: value === this.state.confirmNewPassword })
    this.setState({ passwordMatch: value === this.state.confirmNewPassword })
  }

  handleConfirmNewPassword(value) {
    this.setState({ confirmNewPassword: value, passwordMatch: value === this.state.newPassword })
  }

  handleSubmit() {
    const data = { password: this.state.newPassword, firstAccess: false }
    this.props.updateProfile(data).then(() => {
      this.$f7router.navigate({ name: 'WaitingForDevice' })
    })
  }

  passwordMatch() {
    return this.state.newPassword === this.state.confirmNewPassword
  }

  render() {
    const pageTitle = 'Argo Instant: nova senha'

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

    return (
      <Page className="new-password-page">
        <Helmet title={ pageTitle } />
        <Navbar>
          <div className="app-navbar__left">{renderBackButton()}</div>
          <div className="app-navbar__center app-navbar__title">Nova Senha</div>
          <div className="app-navbar__right"></div>
        </Navbar>
        <div className="new-password-page__content">
          <h1 className="new-password-page__content__title">Digite sua nova senha</h1>
          <List>
            <PrimaryInput
              label="Nova senha"
              value={ this.state.newPassword }
              onChange={ e => this.handleNewPasswordChange(e.target.value) }
              type="password"
            />
            <PrimaryInput
              label="Confirmação da nova senha"
              value={ this.state.confirmNewPassword }
              onChange={ e => this.handleConfirmNewPassword(e.target.value) }
              type="password"
            />
          </List>
          <PrimaryButton onClick={ () => this.handleSubmit() } disabled={ !this.state.passwordMatch }>Redefinir senha e entrar</PrimaryButton>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  updateProfile: data => dispatch(updateProfile(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword)
