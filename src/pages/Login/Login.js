/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description User authentication page.
 */

import React from 'react'
import Helmet from 'react-helmet'
import { Page, PageContent, List } from 'framework7-react'
import { connect } from 'react-redux'
import isEmpty from 'validator/lib/isEmpty'

import PrimaryInput from '../../components/PrimaryInput'
import PrimaryButton from '../../components/PrimaryButton'

import logoWithIcon from '../../assets/vectors/logo-with-icon.svg'

import './Login.scss'

import { authenticate } from '../../actions/user'

import authService from '../../services/auth'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: { email: '', password: '' },
      isLoading: false
    }
  }

  componentWillMount() {}

  componentDidMount() {}

  isValidForm() {
    const { user } = this.state
    return !isEmpty(user.email) && !isEmpty(user.password)
  }

  onSubmit() {
    this.setState({ isLoading: true })
    const { user } = this.state
    this.props
      .authenticate({ email: user.email, password: user.password })
      .then(data => {
        setTimeout(() => {
          this.setState({ isLoading: false })
          authService.setUserToken(data.token)
          this.$f7router.navigate({ name: 'Home' })
        }, 2000)
      })
      .catch(e => {
        console.log(e)
        this.setState({ isLoading: false })
        this.$f7.dialog.alert(
          'Por favor, verifique suas credenciais e tente novamente.',
          'Houve uma falha na operação'
        )
      })
  }

  render() {
    const pageTitle = 'Pictagram'
    const { user } = this.state
    return (
      <Page className="login-page">
        <Helmet title={pageTitle} />
        <PageContent>
          <article className="login-page__content">
            <List className="login-page__form">
              <img src={logoWithIcon} alt="Pictagram" className="login-page__logo" />
              <PrimaryInput
                value={user.email}
                onChange={e => {
                  this.setState({ user: { ...user, email: e.target.value } })
                }}
                required
                label="E-mail"
                type="email"
              />
              <PrimaryInput
                value={user.password}
                onChange={e => {
                  this.setState({ user: { ...user, password: e.target.value } })
                }}
                label="Senha"
                type="password"
              />
              <PrimaryButton
                fill
                color="primary"
                disabled={!this.isValidForm()}
                isLoading={this.state.isLoading}
                onClick={() => {
                  this.onSubmit()
                }}>
                Entrar
              </PrimaryButton>
            </List>
          </article>
        </PageContent>
      </Page>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  authenticate: user => dispatch(authenticate(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
