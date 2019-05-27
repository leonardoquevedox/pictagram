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
import videoIntro from '../../assets/vectors/record-vehicle-video-icon.svg'

import PrimaryButton from '../../components/PrimaryButton'
import Navbar from '../../components/Navbar'
import Step from '../../components/Step'

import { startRecordingVehicleVideo, stopRecordingVehicleVideo } from '../../actions/vehicle'

import './IntroduceVehicleVideo.scss'

class IntroduceVehicleVideo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.videoRef = React.createRef()
  }

  onSubmit() {
    this.$f7router.navigate({ name: 'ConfirmVehicleVideo' })
  }

  canGoBack() {
    const { f7router } = this.props
    const { history } = f7router
    return history.length > 0
  }

  render() {
    const pageTitle = 'Argo Instant: Vídeo do Veículo'
    const { isRecording } = this.state
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
      </div>
    )

    return (
      <Page className="introduce-vehicle-video-page">
        <Helmet title={pageTitle} />
        <Navbar className="user-info-page__navbar">
          <div className="app-navbar__left">{renderBackButton()}</div>
          <div className="app-navbar__center app-navbar__title">Dados do carro</div>
          <div className="app-navbar__right">{renderSteps()}</div>
        </Navbar>
        <div className="introduce-vehicle-video-page__content">
          <div className="introduce-vehicle-video-page__intro">
            Vamos precisar de um vídeo do seu carro
          </div>
          <img
            className="introduce-vehicle-video-page__illustration"
            src={videoIntro}
            alt="Ilustração da câmera"
          />
          <div className="introduce-vehicle-video-page__action">
            <div className="introduce-vehicle-video-page__action__title">Vamos gravar o vídeo</div>
            <div className="introduce-vehicle-video-page__action__tip">
              Precisamos de um vídeo 360º do seu carro.
            </div>
            <PrimaryButton
              className={isRecording ? 'rounded' : ''}
              onClick={() => {
                this.onSubmit()
              }}>
              Abrir Câmera
            </PrimaryButton>
          </div>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  startRecording: videoElement => dispatch(startRecordingVehicleVideo(videoElement)),
  stopRecording: () => dispatch(stopRecordingVehicleVideo())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroduceVehicleVideo)
