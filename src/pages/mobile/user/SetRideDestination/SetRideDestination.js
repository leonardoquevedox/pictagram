/**
 * @license MIT
 * @version 1.1.0
 * @author Leonardo Quevedo
 * @description User information page.
 */

import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Page, List, Link } from 'framework7-react'
import { updateRideInCreation } from '../../../../actions/ride'

import arrow from '../../../../assets/vectors/arrow.svg'
import route from '../../../../assets/vectors/route.svg'

import PrimaryButton from '../../../../components/PrimaryButton'
import PrimaryInput from '../../../../components/PrimaryInput'
import Navbar from '../../../../components/Navbar'
import Form from '../../../../components/Form'

import './SetRideDestination.scss'

class SetRideDestination extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ride: {
        destination: ''
      }
    }
  }

  componentDidMount() {}

  removeItem(index) {
    const updatedDestination = this.state.destination
    updatedDestination.splice(index, 1)
    this.setState({ destination: updatedDestination })
  }

  onSubmit() {
    this.props.updateRideInCreation({ destination: this.state.destination })
    this.$f7router.navigate({ name: 'SetRideDestination' })
  }

  canGoBack() {
    const { f7router } = this.props
    const { history } = f7router
    return history.length > 0
  }

  render() {
    const pageTitle = 'Frete Fácil: Cadastro'
    const { ride } = this.state
    const renderBackButton = () =>
      this.canGoBack() && (
        <Link
          style={{ verticalAlign: 'middle' }}
          onClick={() => {
            this.$f7router.back()
          }}>
          <img src={arrow} alt="Voltar" />
        </Link>
      )

    return (
      <Page className="ride-destination-page">
        <Helmet title={pageTitle} />
        <Navbar className="ride-destination-page__navbar">
          <div className="app-navbar__left">{renderBackButton()}</div>
          <div className="app-navbar__center app-navbar__title">Novo frete</div>
          <div className="app-navbar__right" />
        </Navbar>
        <div className="ride-destination-page__content">
          <div className="ride-destination-page__intro">
            <div className="ride-destination-page__intro__title">Destino do frete</div>
            <div className="ride-destination-page__intro__content">Para onde você deseja enviar seus itens?</div>
          </div>
          <List className="ride-destination-page__form">
            <Form>
              <img className="ride-destination-page__illustration" src={route} alt='' />
              <PrimaryInput
                value={ride.destination}
                onChange={e => {
                  this.setState({ ride: { ...ride, destination: e.target.value } })
                }}
                required
                colorTheme="orange"
                label="CEP de destino"
                type="text"
              />
              <PrimaryButton
                disabled={!(ride.destination.length > 1)}
                isLoading={this.state.isLoading}
                onClick={() => {
                  this.onSubmit()
                }}>
                Finalizar
              </PrimaryButton>
            </Form>
          </List>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  updateRideInCreation: data => dispatch(updateRideInCreation(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetRideDestination)
