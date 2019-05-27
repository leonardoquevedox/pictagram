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

import Navbar from '../../components/Navbar'

import arrowIcon from '../../assets/vectors/arrow.svg'

import './PolicyDetails.scss'

class PolicyDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() { }

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

    const pageTitle = 'Argo Instant: Apólice'
    return (
      <Page className="policy-page">
        <Helmet title={pageTitle} />
        <Navbar className="checkout-page__navbar">
          <div className="app-navbar__left policy-detail">{renderBackButton()}</div>
          <div className="app-navbar__center app-navbar__title">{`Apólice ${this.props.user.name.split(' ')[0]}`}</div>
          <div className="app-navbar__right" />
        </Navbar>
        <div className="policy-page__content">
          <iframe
            className="policy-page__content-iframe"
            title="Apólice"
            name="policy-iframe"
            id="policy-iframe"
            frameBorder="0"
            border="0"
            cellSpacing="0"
            seamless="seamless"
            scrolling="no"
            src={this.props.checkout.documentUrl}
          ></iframe>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  checkout: state.checkout.current,
  user: state.user.profile
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PolicyDetails)
