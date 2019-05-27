/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description User information page.
 */

import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Page, List } from 'framework7-react'
import Lottie from 'react-lottie'

/* import truck from '../../assets/vectors/truck.svg' */
import truck from '../../assets/animations/truck.json'

import PrimaryButton from '../../components/PrimaryButton'

import './WaitingForDevice.scss'

class WaitingForDevice extends React.Component {
  video = React.createRef()

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  onSubmit() {
    this.$f7router.navigate({ name: 'SynchronizeDevice' })
  }

  canGoBack() {
    const { f7router } = this.props
    const { history } = f7router
    return history.length > 0
  }

  render() {
    const pageTitle = 'Argo Instant: CNH'
    const truckAnimation = {
      loop: true,
      autoplay: true,
      animationData: truck,
      rendererSettings: {
        preserveAspectRatio: 'xMaxYMax slice'
      }
    }
    return (
      <Page className="waiting-for-device-page">
        <Helmet title={pageTitle} />
        <div className="waiting-for-device-page__content">
          <div className="waiting-for-device-page__intro">
            <div className="waiting-for-device-page__intro__title">Seu NNNNN já está chegando</div>
            <div className="waiting-for-device-page__intro__content">
              Após a confirmação do envio, seu NNNNN pegou a estrada com toda segurança. E, entre 3 e 7 dias, vai chegar na sua casa.
            </div>
          </div>
          <List className="waiting-for-device-page__form">
            <div className="waiting-for-device-page__form__illustration">
              <Lottie options={truckAnimation} />
            </div>
            {/* <img
              className="waiting-for-device-page__form__illustration"
              src={truck}
              alt="Ilustração da câmera"
            /> */}
            <div className="waiting-for-device-page__action">
              <div className="waiting-for-device-page__action__title">
                Seu NNNNN está na estrada
              </div>
              <div className="waiting-for-device-page__action__tip">
                Se você já tem o NNNNN, é só clicar ali embaixo.
              </div>
            </div>
          </List>
        </div>
        <div className="waiting-for-device-page__footer">
          <PrimaryButton
            onClick={() => {
              this.onSubmit()
            }}>
            Meu NNNNN está na mão
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
)(WaitingForDevice)
