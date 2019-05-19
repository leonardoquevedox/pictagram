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
import { createProfile } from '../../../actions/user'

import arrowIcon from '../../../assets/vectors/arrow.svg'

import PrimaryButton from '../../../components/PrimaryButton'
import Navbar from '../../../components/Navbar'
import Form from '../../../components/Form'

import './SelectRole.scss'

class SelectRole extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  canGoBack() {
    const { f7router } = this.props
    const { history } = f7router
    return history.length > 0
  }

  render() {
    const pageTitle = 'Frete Fácil: Cadastro'
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

    return (
      <Page className="select-role-page">
        <Helmet title={pageTitle} />
        <Navbar className="select-role-page__navbar">
          <div className="app-navbar__left">{renderBackButton()}</div>
          <div className="app-navbar__center app-navbar__title">Frete Fácil</div>
          <div className="app-navbar__right" />
        </Navbar>
        <div className="select-role-page__content">
          <div className="select-role-page__intro">
            <div className="select-role-page__intro__title">Olá!</div>
            <div className="select-role-page__intro__content">
              Pronto(a) para começar? Selecione seu tipo de usuário abaixo ;)
            </div>
          </div>
          <List className="select-role-page__form">
            {/* <div className="select-role-page__form__title">Tipos de usuário</div> */}
            <Form>
              <PrimaryButton
                onClick={() => {
                  this.$f7router.navigate({ name: 'CreateUser' })
                }}>
                Quero solicitar fretes
              </PrimaryButton>
              <PrimaryButton
                onClick={() => {
                  this.$f7router.navigate({ name: 'CreateDriver' })
                }}>
                Sou um freteiro
              </PrimaryButton>
            </Form>
          </List>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.profile
})

const mapDispatchToProps = dispatch => ({
  createProfile: data => dispatch(createProfile(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectRole)
