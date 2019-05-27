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
import camera from '../../assets/vectors/camera.svg'

import PrimaryButton from '../../components/PrimaryButton'
import Navbar from '../../components/Navbar'
import Step from '../../components/Step'

import { startCnhPicturePreview, takeCnhPicture } from '../../actions/user'
import './TakeDriverLicensePicture.scss'

class TakeDriverLicensePicture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.$f7router.on('routeChange', newRoute => {
      const isCurrentPage = newRoute.name === 'TakeDriverLicensePicture'
      if (isCurrentPage) {
        this.startLivePreview()
      }
    })
  }

  startLivePreview() {
    const videoRef = document.querySelector('#cnh-picture-live-preview')
    const placeholderRef = document.querySelector('#cnh-picture-placeholder')
    videoRef.addEventListener('play', e => {
      videoRef.style.display = 'block'
      placeholderRef.style.display = 'none'
    })
    this.props
      .startLivePreview(videoRef)
      .then(() => {})
      .catch(e => {
        console.log(e)
      })
  }

  takePicture() {
    const videoRef = document.querySelector('#cnh-picture-live-preview')
    const placeholderRef = document.querySelector('#cnh-picture-placeholder')
    placeholderRef.style.display = 'block'
    videoRef.style.display = 'none'
    this.props
      .takePicture(videoRef)
      .then(data => {
        console.log(data)
        this.onSubmit()
      })
      .catch(e => {
        console.log(e)
      })
  }

  onSubmit() {
    this.$f7router.navigate({ name: 'ConfirmDriverLicense' })
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
      </div>
    )

    return (
      <Page className="take-driver-license-picture-page">
        <Helmet title={pageTitle} />
        <Navbar className="user-info-page__navbar">
          <div className="app-navbar__left">{renderBackButton()}</div>
          <div className="app-navbar__center app-navbar__title">Dados pessoais</div>
          <div className="app-navbar__right">{renderSteps()}</div>
        </Navbar>
        <div className="take-driver-license-picture-page__content">
          <div
            id="cnh-picture-placeholder"
            className="take-driver-license-picture-page__placeholder visible">
            <Preloader
              size={32}
              className="take-driver-license-picture-page__placeholder__loader"
            />
          </div>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            id="cnh-picture-live-preview"
            style={{ display: 'none' }}
            className="take-driver-license-picture-page__video-preview"
          />
        </div>
        <div className="take-driver-license-picture-page__footer">
          <PrimaryButton
            className="recording"
            onClick={() => {
              this.takePicture()
            }}>
            <img src={camera} alt="Encerrar gravação" />
          </PrimaryButton>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  startLivePreview: videoElement => dispatch(startCnhPicturePreview(videoElement)),
  takePicture: videoElement => dispatch(takeCnhPicture(videoElement))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TakeDriverLicensePicture)
