/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description User information page.
 */

import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Page } from 'framework7-react'

import ripples from '../../assets/vectors/ripples.svg'

import PrimaryButton from '../../components/PrimaryButton'
import Navbar from '../../components/Navbar'

import './SynchronizationFeedback.scss'

class SynchronizationFeedback extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  onSubmit() {
    this.$f7router.navigate({ name: 'Home' })
  }

  render() {
    const pageTitle = 'Argo Instant: Pronto!'
    return (
      <Page className="synchronization-feedback-page">
        <Helmet title={pageTitle} />
        <Navbar className="user-info-page__navbar">
          <div className="app-navbar__left"></div>
          <div className="app-navbar__center--fullwidth">
            <span className="app-navbar__title">Conclusão da instalação</span>
          </div>
          <div className="app-navbar__right" />
        </Navbar>
        <div className="synchronization-feedback-page__content">
          <div className="synchronization-feedback-page__content__title">Perfeito!</div>
          <div className="synchronization-feedback-page__content__subtitle">
            O seu seguro está pronto para você pegar a estrada com toda tranquilidade. Só não esqueça de manter o GPS e o Bluetooh ativados.
          </div>
          <img
            className="synchronization-feedback-page__form__illustration"
            src={ripples}
            alt="Ilustração da câmera"
          />
        </div>
        <div className="synchronization-feedback-page__footer">
          <PrimaryButton
            onClick={() => {
            this.onSubmit()
          }}>
            Ok
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
)(SynchronizationFeedback)

/* Leaving those here in case they come back in Figma
<img className="synchronization-feedback-page__navbar__ripple bottom-center-left" src={ripples} alt="" />
<img className="synchronization-feedback-page__navbar__ripple bottom-center" src={ripples} alt="" />
<img className="synchronization-feedback-page__navbar__ripple right" src={ripples} alt="" />
<img className="synchronization-feedback-page__navbar__ripple left" src={ripples} alt="" />
<img className="synchronization-feedback-page__navbar__ripple top-center" src={ripples} alt="" />
<img className="synchronization-feedback-page__navbar__ripple top-center-right" src={ripples} alt="" /> */
