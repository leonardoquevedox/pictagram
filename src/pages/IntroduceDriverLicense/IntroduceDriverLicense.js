/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description User information page.
 */

import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Page, Link } from 'framework7-react'

import arrowIcon from '../../assets/vectors/arrow.svg'
import pictureIntro from '../../assets/vectors/picture-intro.svg'

import PrimaryButton from '../../components/PrimaryButton'
import Navbar from '../../components/Navbar'
import Step from '../../components/Step'

import './IntroduceDriverLicense.scss'

class IntroduceDriverLicense extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isCameraOpen: false
    }
  }

  componentDidMount() {}

  onSubmit() {
    this.$f7router.navigate({ name: 'TakeDriverLicensePicture' })
  }

  canGoBack() {
    const { f7router } = this.props
    const { history } = f7router
    return history.length > 0
  }

  render() {
    const pageTitle = 'Argo Instant: CNH'
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
      <Page className="introduce-driver-license-page">
        <Helmet title={pageTitle} />
        <Navbar className="user-info-page__navbar">
          <div className="app-navbar__left">{renderBackButton()}</div>
          <div className="app-navbar__center app-navbar__title">Dados pessoais</div>
          <div className="app-navbar__right">{renderSteps()}</div>
        </Navbar>
        <div className="introduce-driver-license-page__content">
          <div className="introduce-driver-license-page__intro">
            E precisamos também de uma foto da sua CNH
          </div>
          <img
            className="introduce-driver-license-page__illustration"
            src={pictureIntro}
            alt="Ilustração da câmera"
          />
          <div className="introduce-driver-license-page__action">
            <div className="introduce-driver-license-page__action__title">Vamos tirar a foto</div>
            <div className="introduce-driver-license-page__action__tip">
            Pra foto ficar boa, lembre-se tirar a CNH do plástico e abrir o documento. Vamos lá?
            </div>

          </div>
        </div>
        <div className="introduce-driver-license-page__footer">
          <PrimaryButton
            disabled={this.state.isCameraOpen}
            isLoading={this.state.isCameraOpen}
            onClick={() => {
              this.onSubmit()
          }}>
            Abrir câmera
          </PrimaryButton>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroduceDriverLicense)
