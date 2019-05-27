import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Link, Page } from 'framework7-react'

import PrimaryButton from '../../components/PrimaryButton'

import emailSentIcon from '../../assets/img/email-sent-icon.png'

import './ForgotPasswordEmailSent.scss'

class ForgotPasswordEmailSent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const pageTitle = 'Argo Instant: Email enviado'
    return (
      <Page className="forgot-password-email-sent-page">
        <Helmet title={ pageTitle } />
        <div className="forgot-password-email-sent-page__content">
          <img className="forgot-password-email-sent-page__content__icon" src={ emailSentIcon } alt="Email enviado" />
          <h1 className="forgot-password-email-sent-page__content__title">E-mail enviado</h1>
          <p className="forgot-password-email-sent-page__content__body-text">Em alguns instantes você receberá seu e-mail com a nova senha.</p>
          <PrimaryButton onClick={ () => this.$f7router.navigate({ name: 'Login' }) }>Ok</PrimaryButton>
          <div className="forgot-password-email-sent-page__content__link">
            <Link onClick={ () => this.$f7router.back() }>Não recebi o e-mail</Link>
          </div>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordEmailSent)
