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

import Navbar from '../../components/Navbar'
import logo from '../../assets/vectors/logo.svg'

import policyDoc from '../../assets/vectors/policy-doc.svg'

import { readCheckout, setCurrentCheckout } from '../../actions/checkout'

import './Policy.scss'

class Policy extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.readCheckout()
  }

  goToPolicyDetails(checkout) {
    this.props.setCurrentCheckout(checkout)
    this.$f7router.navigate({ name: 'PolicyDetails' })
  }

  render() {
    const pageTitle = 'Argo Instant: Apólice'
    return (
      <Page className="policy-page">
        <Helmet title={pageTitle} />
        <Navbar className="home-page__navbar">
          <div className="app-navbar__left">
            <img src={logo} alt="Instant" />
          </div>
          <div className="app-navbar__center  app-navbar__title" />
          <div className="app-navbar__right" />
        </Navbar>
        <div className="policy-page__content">
          <div className="policy-page__intro">
            <div className="policy-page__intro__title">Sua apólice</div>
            <div className="policy-page__intro__content">Visualize sua apólice abaixo.</div>
          </div>
          <div className="policy-page__list">
            {this.props.checkouts &&
              this.props.checkouts.map(checkout => (
                <Link key={checkout.id} className="policy-page__item" href={checkout.documentUrl} external>
                  <div className="policy-page__item__left">
                    <img className="policy-page__item__icon" src={policyDoc} alt="" />
                  </div>
                  <div className="policy-page__item__middle">
                    <div className="policy-page__item__title">{`Apólice ${
                      this.props.user.name.split(' ')[0]
                    }`}</div>
                    <div className="policy-page__item__description">{`Vencimento: ${moment(
                      checkout.createdAt
                    )
                      .add(1, 'years')
                      .format('DD/MM/YYYY')}`}</div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  checkouts: state.checkout.list,
  user: state.user.profile
})

const mapDispatchToProps = dispatch => ({
  readCheckout: () => dispatch(readCheckout()),
  setCurrentCheckout: checkout => dispatch(setCurrentCheckout(checkout))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Policy)
