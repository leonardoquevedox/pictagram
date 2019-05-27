/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description User information page.
 */

import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Page, Link, Preloader } from 'framework7-react'

import arrowIcon from '../../assets/vectors/arrow.svg'
import videocamera from '../../assets/vectors/videocamera.svg'

import PrimaryButton from '../../components/PrimaryButton'
import Navbar from '../../components/Navbar'
import Step from '../../components/Step'

import {
  startRecordingVehicleVideo,
  stopRecordingVehicleVideo,
  startVideoPreview
} from '../../actions/vehicle'

import './RecordVehicleVideo.scss'

const VIDEO_DURATION = 30

class RecordVehicleVideo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isRecording: false,
      countdown: VIDEO_DURATION
    }
  }

  componentDidMount() {
    this.videoRef = React.createRef()
    this.$f7router.on('routeChange', newRoute => {
      const isCurrentPage = newRoute.name === 'RecordVehicleVideo'
      if (isCurrentPage) {
        this.startPreview()
      }
    })
  }

  startPreview() {
    const videoRef = document.querySelector('#video-ref')
    const placeholderRef = document.querySelector('#record-video-placeholder')
    videoRef.addEventListener('play', e => {
      videoRef.style.display = 'block'
      placeholderRef.style.display = 'none'
    })
    this.props.startVideoPreview(videoRef)
  }

  startRecording() {
    const videoRef = document.querySelector('#video-ref')
    this.timerIntervalRef = setInterval(() => {
      this.setState({ countdown: this.state.countdown - 1 }, () => {
        if (this.state.countdown === 0) this.stopRecording()
      })
    }, 1000)
    this.props
      .startRecording(videoRef)
      .then(() => {
        this.setState({ isRecording: true }, () => {})
      })
      .catch(e => {
        console.log(e)
      })
  }

  stopRecording() {
    const videoRef = document.querySelector('#video-ref')
    const placeholderRef = document.querySelector('#record-video-placeholder')
    videoRef.style.display = 'block'
    placeholderRef.style.display = 'none'
    this.setState({ isRecording: false, countdown: VIDEO_DURATION })
    clearInterval(this.timerIntervalRef)
    this.props
      .stopRecording(videoRef)
      .then(() => {
        this.onSubmit()
      })
      .catch(e => {
        console.log(e)
      })
  }

  getCountdownLabel(countdown) {
    const seconds = countdown >= 10 ? countdown : `0${countdown}`
    return countdown > 59 ? `1:00` : `0:${seconds}`
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
    const { isRecording, countdown } = this.state
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

    const handleVideoRef = video => {}

    return (
      <Page className="record-vehicle-video-page">
        <Helmet title={pageTitle} />
        <Navbar className="user-info-page__navbar">
          <div className="app-navbar__left">{renderBackButton()}</div>
          <div className="app-navbar__center app-navbar__title">Dados do carro</div>
          <div className="app-navbar__right">{renderSteps()}</div>
        </Navbar>
        <div className="record-vehicle-video-page__content">
          <div
            id="record-video-placeholder"
            className="record-vehicle-video-page__placeholder visible">
            <Preloader size={32} className="record-vehicle-video-page__placeholder__loader" />
          </div>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            id="video-ref"
            style={{ display: 'none' }}
            ref={handleVideoRef}
            className="record-vehicle-video-page__video-preview"
          />
        </div>
        <div className="record-vehicle-video-page__footer">
          <PrimaryButton
            className={isRecording ? 'recording' : ''}
            disabled={isRecording}
            onClick={() => {
              this.startRecording()
            }}>
            {this.state.isRecording ? (
              this.getCountdownLabel(countdown)
            ) : (
              <img src={videocamera} alt="Encerrar gravação" />
            )}
          </PrimaryButton>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  startVideoPreview: videoElement => dispatch(startVideoPreview(videoElement)),
  startRecording: videoElement => dispatch(startRecordingVehicleVideo(videoElement)),
  stopRecording: videoElement => dispatch(stopRecordingVehicleVideo(videoElement))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordVehicleVideo)
