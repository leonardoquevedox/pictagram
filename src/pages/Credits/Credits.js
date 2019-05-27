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
import moment from 'moment'

import arrowIcon from '../../assets/vectors/arrow.svg'

import { readCheckout } from '../../actions/checkout'

import AvailableCreditsCard from '../../components/AvailableCreditsCard'
import Navbar from '../../components/Navbar'

import './Credits.scss'

class Credits extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.readCheckout()
  }

  canGoBack() {
    const { f7router } = this.props
    const { history } = f7router
    return history.length > 0
  }

  render() {
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
    const pageTitle = 'Argo Instant: Créditos'
    return (
      <Page className="credits-page">
        <Helmet title={pageTitle} />
        <Navbar className="home-page__navbar">
          <div className="app-navbar__left">{renderBackButton()}</div>
          <div className="app-navbar__center app-navbar__title">Créditos</div>
          <div className="app-navbar__right" />
        </Navbar>
        <div className="credits-page__content">
          <div className="credits-page__intro">
            <AvailableCreditsCard value={this.props.credit.quantity} full />
          </div>
          <div className="credits-page__list">
            {
              this.props.checkouts && this.props.checkouts.map(checkout =>
                (<div className="credits-page__item">
                  <div className="credits-page__item__middle">
                    <div className="credits-page__item__title">{`${checkout.creditsQuantity} Créditos`}</div>
                    <div className="credits-page__item__description">{checkout.installmentsInfo}</div>
                  </div>
                  <div className="credits-page__item__right">
                    <div className="credits-page__item__description">{moment(checkout.createdAt).format('DD/MM/YYYY')}</div>
                  </div>
                </div>))
            }
          </div>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  checkouts: state.checkout.list,
  credit: state.credit.current,
  user: state.user.profile
})

const mapDispatchToProps = dispatch => ({
  readCheckout: () => dispatch(readCheckout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Credits)
