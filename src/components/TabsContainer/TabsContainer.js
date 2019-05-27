/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description Adaptive navbar.
 */

import React from 'react'
import { Link, Toolbar, Tabs, Tab, Page } from 'framework7-react'

import { connect } from 'react-redux'



import iconHome from '../../assets/vectors/tab-icon-home.svg'
import iconPolicy from '../../assets/vectors/tab-icon-policy.svg'
import iconContact from '../../assets/vectors/tab-icon-contact.svg'
import iconProfile from '../../assets/vectors/tab-icon-profile.svg'

import './TabsContainer.scss'
import Contact from '../../pages/Contact'
import Home from '../../pages/Home'
import Policy from '../../pages/Policy'
import Profile from '../../pages/Profile'

const rootPages = [
  {
    path: 'start',
    label: 'Início',
    icon: iconHome,
    component: Home
  },
  {
    path: 'policy',
    label: 'Apólice',
    icon: iconPolicy,
    component: Policy
  },
  {
    path: 'contact',
    label: 'Contato',
    icon: iconContact,
    component: Contact
  },
  {
    path: 'profile',
    label: 'Conta',
    icon: iconProfile,
    component: Profile
  }
]

class TabsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: rootPages[0]
    }
  }

  render() {
    const { selectedTab } = this.state
    const isActive = tab => selectedTab.path === tab.path
    return (
      <Page pageContent={false} className="app-tabs">
        <Toolbar noShadow tabbar position="bottom">
          {rootPages.map(tab => (
            <Link
              key={tab.path}
              tabLinkActive={isActive(tab)}
              onClick={() => {
                this.setState({ selectedTab: tab })
              }}>
              <img src={tab.icon} alt={tab.label} />
              <span>{tab.label}</span>
            </Link>
          ))}
        </Toolbar>
        <Tabs>
          {rootPages.map(tab => {
            const TabContent = tab.component
            return (
              <Tab key={tab.path} className="page-content" id={tab.path} tabActive={isActive(tab)}>
                <TabContent {...this.props} />
              </Tab>
            )
          })}
        </Tabs>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  ui: state.ui
})

const mapDispatchToProps = dispatch => ({


})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabsContainer)
