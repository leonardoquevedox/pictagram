import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Link, List, Page } from 'framework7-react'
import VMasker from 'vanilla-masker'

import Navbar from '../../components/Navbar'
import PrimaryInput from '../../components/PrimaryInput'

import { logout } from '../../actions/user'

import logo from '../../assets/vectors/logo.svg'
import logoutIcon from '../../assets/img/logout.png'

import './Profile.scss'

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  handleLogout() {
    this.props.logout()
    this.$f7router.navigate({ name: 'Login' })
  }

  render() {
    const pageTitle = 'Pictagram'

    return (
      <Page className="profile-page">
        <Helmet title={ pageTitle } />
        <Navbar className="home-page__navbar">
          <div className="app-navbar__left">
            <img src={logo} alt="Instant" />
          </div>
          <div className="app-navbar__center app-navbar__title" />
          <div className="app-navbar__right">
          </div>
        </Navbar>
        <div className="profile-page__content">
          <List>
            <PrimaryInput
              value={ this.props.profile.name }
              label="Nome completo"
              type="text"
              disabled
            />
            <div className="profile-page__separator"></div>
            <PrimaryInput
              value={ this.props.profile.email }
              label="E-mail"
              type="text"
              disabled
            />
            <div className="profile-page__separator"></div>
            <PrimaryInput
              value={ VMasker.toPattern(this.props.profile.cpf, '999.999.999-99') }
              label="CPF"
              type="text"
              disabled
            />
            <p className="login-page__paragraph profile-page__link">
              <Link className="login-page__link" onClick={ () => this.handleLogout() }>
                <img className="profile-page__logout-img" src={ logoutIcon } alt="Sair" />
                Sair do aplicativo
              </Link>
              </p>
          </List>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.user.profile
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
