/**
 * @license MIT
 * @version 1.1.0
 * @author Leonardo Quevedo
 * @description User information page.
 */

import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Page } from 'framework7-react'


import icon from '../../../assets/vectors/icon.svg'
import auth from '../../../services/auth'

import PrimaryButton from '../../../components/PrimaryButton'
import Navbar from '../../../components/Navbar'

import './NotFound.scss'

class NotFound extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  onSubmit() {
    const { router } = this.$f7.views.main
    const isWeb = process.env.REACT_APP_IS_BROWSER
    const isLoggedIn = auth.isLoggedIn()
    const mobileRouterRoot = isLoggedIn ? 'Home' : 'Login'
    const webRouterRoot = isLoggedIn ? 'Home' : 'Login'
    const rootPage = isWeb ? webRouterRoot : mobileRouterRoot
    console.log(`Navigating to ${rootPage} page...`)
    router.navigate({ name: rootPage })
  }

  canGoBack() {
    const { f7router } = this.props
    const { history } = f7router
    return history.length > 0
  }

  render() {
    const pageTitle = 'Frete Fácil: Pronto!'
    return (
      <Page className="not-found-page">
        <Helmet title={pageTitle} />
        <Navbar className="user-info-page__navbar">
          <div className="app-navbar__left" />
          <div className="app-navbar__center--fullwidth">
            <span className="app-navbar__title" />
          </div>
          <div className="app-navbar__right" />
        </Navbar>
        <div className="not-found-page__content">
          <img className="not-found-page__illustration" src={icon} alt="Logo: Frete Fácil" />
          <div className="not-found-page__intro">
            <div className="not-found-page__intro__title">Página não encontrada</div>
            <div className="not-found-page__intro__content">
              Este endereço parece não existir mais no nosso sistema.
            </div>
          </div>
          <PrimaryButton
            onClick={() => {
              this.onSubmit()
            }}>
            Voltar
          </PrimaryButton>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  
  
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotFound)

/* Leaving those here in case they come back in Figma
<img className="not-found-page__navbar__ripple bottom-center-left" src={ripples} alt="" />
<img className="not-found-page__navbar__ripple bottom-center" src={ripples} alt="" />
<img className="not-found-page__navbar__ripple right" src={ripples} alt="" />
<img className="not-found-page__navbar__ripple left" src={ripples} alt="" />
<img className="not-found-page__navbar__ripple top-center" src={ripples} alt="" />
<img className="not-found-page__navbar__ripple top-center-right" src={ripples} alt="" /> */
