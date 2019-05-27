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
import playIcon from '../../assets/vectors/play-video-icon.svg'

import PrimaryButton from '../../components/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton'
import Navbar from '../../components/Navbar'
import Step from '../../components/Step'

import { saveVideo } from '../../actions/vehicle'

import './ConfirmVehicleVideo.scss'

class ConfirmVehicleVideo extends React.Component {
  video = React.createRef()

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  getBlobUrl(blob) {
    if (blob && blob.size) console.log(URL.createObjectURL(blob))
    if (blob && blob.size) return URL.createObjectURL(blob)
    return {}
  }

  playVideo() {
    const videoRef = document.querySelector('#confirm-video-ref')
    const placeholderRef = document.querySelector('#confirm-video-placeholder')
    const playButtonRef = document.querySelector('#confirm-video-play-button')
    if (videoRef) {
      videoRef.addEventListener('play', e => {
        videoRef.style.display = 'block'
        placeholderRef.style.display = 'none'
        playButtonRef.style.display = 'none'
      })
      videoRef.play()
    }
  }

  onSubmit() {
    this.setState({ isLoading: true })
    const { vehicle, video } = this.props
    this.props
      .saveVideo(vehicle.id, video)
      .then(() => {
        const videoRef = document.querySelector('#confirm-video-ref')
        const placeholderRef = document.querySelector('#confirm-video-placeholder')
        const playButtonRef = document.querySelector('#confirm-video-play-button')
        videoRef.style.display = 'none'
        placeholderRef.style.display = 'block'
        playButtonRef.style.display = 'block'
        this.$f7router.navigate({ name: 'RiskForm' })
      })
      .catch(() => {
        this.$f7.dialog.alert(
          'Por favor, tente novamente mais tarde.',
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
    const pageTitle = 'Argo Instant: CNH'
    const { video } = this.props
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
      <Page className="confirm-vehicle-video-page">
        <Helmet title={pageTitle} />
        <Navbar className="user-info-page__navbar">
          <div className="app-navbar__left">{renderBackButton()}</div>
          <div className="app-navbar__center app-navbar__title">Dados do carro</div>
          <div className="app-navbar__right">{renderSteps()}</div>
        </Navbar>
        <div className="confirm-vehicle-video-page__content">
          <div className="confirm-vehicle-video-page__video-content">
            <div
              id="confirm-video-placeholder"
              className="confirm-vehicle-video-page__placeholder visible"
            />
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              id="confirm-video-ref"
              className="confirm-vehicle-video-page__video-content__preview"
              style={{ display: 'none' }}
              ref={ref => {
                if (ref) console.log(ref)
              }}
              src={this.getBlobUrl(video)}
            />
            <PrimaryButton
              id="confirm-video-play-button"
              className="confirm-vehicle-video-page__video-content__button visible"
              onClick={() => {
                this.playVideo()
              }}>
              <img src={playIcon} alt="" />
            </PrimaryButton>
          </div>
        </div>
        <div className="confirm-vehicle-video-page__footer">
          <PrimaryButton
            isLoading={this.state.isLoading}
            onClick={() => {
              this.onSubmit()
            }}>
            Confirmar
          </PrimaryButton>
          <SecondaryButton
            onClick={() => {
              this.$f7router.back()
            }}>
            Gravar novamente
          </SecondaryButton>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  video: state.vehicle.video,
  vehicle: state.vehicle.current
})

const mapDispatchToProps = dispatch => ({
  saveVideo: (id, video) => dispatch(saveVideo(id, video))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmVehicleVideo)
