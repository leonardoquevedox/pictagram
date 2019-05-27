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

import PrimaryButton from '../../components/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton'
import Navbar from '../../components/Navbar'
import Step from '../../components/Step'

import { saveCnhPicture } from '../../actions/user'

import './PictureFilter.scss'

class PictureFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.startCamera()
  }

  startCamera() {}

  onSubmit() {
    this.setState({ isLoading: true })
    const { currentPicture } = this.props
    this.props
      .saveCnhPicture(currentPicture.src)
      .then(data => {
        console.log(data)
        this.$f7router.navigate({ name: 'ConfirmVehicleInfo' })
      })
      .catch(e => {
        console.log(e)
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
    const pageTitle = 'Pictagram: CNH'
    const { currentPicture } = this.props
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
      <Page className="picture-filter-page">
        <Helmet title={pageTitle} />
        <Navbar className="user-info-page__navbar">
          <div className="app-navbar__left">{renderBackButton()}</div>
          <div className="app-navbar__center app-navbar__title">Dados pessoais</div>
          <div className="app-navbar__right">{renderSteps()}</div>
        </Navbar>
        <div className="picture-filter-page__content">
          <img
            className="picture-filter-page__picture-preview"
            src={currentPicture.src}
            height={currentPicture.height}
            width={currentPicture.width}
            alt="CNH"
          />
        </div>
        <div className="picture-filter-page__footer">
          <div className="picture-filter-page__button-container">
            <PrimaryButton
              isLoading={this.state.isLoading}
              onClick={() => {
                this.onSubmit()
              }}>
              A foto ficou boa. Avançar
            </PrimaryButton>
            <SecondaryButton
              onClick={() => {
                this.$f7router.back()
              }}>
              Quero fazer outra foto.
            </SecondaryButton>
          </div>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  currentPicture: state.user.currentPicture
})

const mapDispatchToProps = dispatch => ({
  saveCnhPicture: data => dispatch(saveCnhPicture(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PictureFilter)
