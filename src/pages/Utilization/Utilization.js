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
import moment from 'moment-mini'

import Navbar from '../../components/Navbar'

import arrowIcon from '../../assets/vectors/arrow.svg'

import './Utilization.scss'

class Utilization extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filteredUtilizations: [],
      selectedMonth: moment(new Date()).month(),
      months: [
        {
          label: 'Jan'
        },
        {
          label: 'Fev'
        },
        {
          label: 'Mar'
        },
        {
          label: 'Abr'
        },
        {
          label: 'Mai'
        },
        {
          label: 'Jun'
        },
        {
          label: 'Jul'
        },
        {
          label: 'Ago'
        },
        {
          label: 'Set'
        },
        {
          label: 'Out'
        },
        {
          label: 'Nov'
        },
        {
          label: 'Dez'
        }
      ]
    }
  }

  componentDidMount() {
    this.filterUtilizations()

    setTimeout(() => {
      document.querySelector('.selected').scrollIntoView({ inline: 'center' })
    }, 2000)
  }

  filterUtilizations() {
    const { selectedMonth } = this.state
    const { utilizations } = this.props
    if (utilizations) {
      const filtered = utilizations.filter(utilization => {
        console.log(utilization)
        return selectedMonth === moment(utilization.date).month()
      })
      this.setState({ filteredUtilizations: filtered })
    }
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

    const pageTitle = 'Argo Instant: Utilização'
    const { months, selectedMonth, filteredUtilizations } = this.state
    return (
      <Page className="utilization-page">
        <Helmet title={pageTitle} />
        <Navbar className="checkout-page__navbar">
          <div className="app-navbar__left">{renderBackButton()}</div>
          <div className="app-navbar__center app-navbar__title">Utilizações</div>
          <div className="app-navbar__right" />
        </Navbar>
        <div className="utilization-page__content">
          <div className="utilization-page__subheader">
            <div className="utilization-page__months">
              {months.map((month, index) => {
                const key = index
                return (
                  /* eslint-disable-next-line */
                  <a
                    key={key}
                    href=""
                    className={`utilization-page__month ${
                      selectedMonth === index ? 'selected' : ''
                    }`}
                    onClick={e => {
                      this.setState({ selectedMonth: index }, () => {
                        this.filterUtilizations()
                      })
                    }}>
                    {month.label}
                  </a>
                )
              })}
            </div>
          </div>
          <div className="utilization-page__list">
            {filteredUtilizations.map(utilization => (
              <div className="utilization-page__item" key={utilization.id}>
                <div className="utilization-page__item__left">
                  <div className="utilization-page__item__title">{utilization.deviceName}</div>
                  <div className="utilization-page__item__description">
                    {utilization.vehicleName}
                  </div>
                </div>
                <div className="utilization-page__item__right">
                  <div className="utilization-page__item__time">
                    {moment(utilization.date).format('DD/MM/YY')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  utilizations: state.user.profile.utilizations
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Utilization)
