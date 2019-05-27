/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description Insurance risk profile page.
 */

import React from 'react'
import Helmet from 'react-helmet'
import { Page } from 'framework7-react'
import { connect } from 'react-redux'

import './RiskProfile.scss'

class RiskProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSyncing: false
    }
  }

  render() {
    const { isSyncing } = this.state
    const pageTitle = 'Argo Instant: Ativação'
    return (
      <Page className="risk-profile-page">
        <Helmet title={pageTitle} />
      </Page>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  
  
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RiskProfile)
