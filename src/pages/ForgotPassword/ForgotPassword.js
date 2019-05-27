import React from 'react'
import Helmet from 'react-helmet'
import { Link, List, Page } from 'framework7-react'
import { connect } from 'react-redux'

import PrimaryInput from '../../components/PrimaryInput'
import PrimaryButton from '../../components/PrimaryButton'
import Navbar from '../../components/Navbar'

import { requestNewPassword } from '../../actions/user'

import arrowIcon from '../../assets/vectors/arrow.svg'

import './ForgotPassword.scss'

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: ''
    }
  }

  requestPassword() {
    this.props.requestNewPassword(this.state).then(() => {
      this.$f7router.navigate({ name: 'ForgotPasswordEmailSent' })
    })
  }

  canGoBack() {
    const { f7router } = this.props
    const { history } = f7router
    return history.length > 0
  }

  render() {
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

    const pageTitle = 'Argo Instant: Esqueci minha senha'
    return (
      <Page className="forgot-password-page">
        <Helmet title={pageTitle} />
        <Navbar>
          <div className="app-navbar__left">{renderBackButton()}</div>
          <div className="app-navbar__center app-navbar__title">Esqueci minha senha</div>
          <div className="app-navbar__right"></div>
        </Navbar>
        <div className="forgot-password-page__content">
          <h1 className="forgot-password-page__content__title">Digite seu email</h1>
          <p className="forgot-password-page__content__body-text">Enviaremos um email com sua nova senha, mas será necessário redefini-lá ao acessar o aplicativo.</p>
          <List>
            <PrimaryInput
              label="E-mail"
              type="email"
              value={ this.state.email }
              onChange={ e => this.setState({ email: e.target.value }) }
            />
          </List>
          <PrimaryButton onClick={ () => this.requestPassword() }>Enviar nova senha</PrimaryButton>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  requestNewPassword: data => dispatch(requestNewPassword(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
