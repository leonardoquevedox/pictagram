/**
 * @license MIT
 * @version 1.1.0
 * @author Leonardo Quevedo
 * @description User information page.
 */

import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Page, List, Link, Row, Col } from 'framework7-react'
import { updateRideInCreation } from '../../../../actions/ride'

import arrowIcon from '../../../../assets/vectors/arrow.svg'

import PrimaryButton from '../../../../components/PrimaryButton'
import PrimaryInput from '../../../../components/PrimaryInput'
import Navbar from '../../../../components/Navbar'
import Form from '../../../../components/Form'

import './SetRideItems.scss'

class SetRideItems extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [{ quantity: '', description: '' }]
    }
  }

  componentDidMount() {}

  removeItem(index) {
    const updatedItems = this.state.items
    updatedItems.splice(index, 1)
    this.setState({ items: updatedItems })
  }

  onSubmit() {
    this.props.updateRideInCreation({ items: this.state.items })
    this.$f7router.navigate({ name: 'SetRideDestination' })
  }

  canGoBack() {
    const { f7router } = this.props
    const { history } = f7router
    return history.length > 0
  }

  render() {
    const pageTitle = 'Frete Fácil: Cadastro'
    const { items } = this.state
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

    const renderItemInput = (item, index) => {
      const isFirstItem = index === 0
      return (
        <Row className="ride-items-page__item" key={index}>
          <Col width={!isFirstItem ? 30 : 40}>
            <PrimaryInput
              value={item.quantity}
              onChange={e => {
                item.quantity = e.target.value
                this.setState({})
              }}
              required
              colorTheme="orange"
              label="Quant."
              type="text"
            />
          </Col>
          <Col width={!isFirstItem ? 55 : 60}>
            <PrimaryInput
              value={item.description}
              onChange={e => {
                item.description = e.target.value
                this.setState({})
              }}
              required
              colorTheme="orange"
              label="Nome do item"
              type="text"
              alignn="center"
            />
          </Col>
          {!isFirstItem && (
            <Col width={15}>
              <PrimaryButton
                className="ride-items-page__item__button-remove"
                onClick={() => {
                  this.removeItem(index)
                }}>
                x
              </PrimaryButton>
            </Col>
          )}
        </Row>
      )
    }

    return (
      <Page className="ride-items-page">
        <Helmet title={pageTitle} />
        <Navbar className="ride-items-page__navbar">
          <div className="app-navbar__left">{renderBackButton()}</div>
          <div className="app-navbar__center app-navbar__title">Novo frete</div>
          <div className="app-navbar__right" />
        </Navbar>
        <div className="ride-items-page__content">
          <div className="ride-items-page__intro">
            <div className="ride-items-page__intro__title">Itens do frete</div>
            <div className="ride-items-page__intro__content">
              O que você gostaria de transportar?
            </div>
          </div>
          <List className="ride-items-page__form">
            <Form>
              {items.map((item, index) => renderItemInput(item, index))}
              <PrimaryButton
                onClick={() => {
                  this.setState({ items: items.concat([{ quantity: '', description: '' }]) })
                }}>
                Adicionar item
              </PrimaryButton>
              <PrimaryButton
                disabled={!(items.length > 1)}
                isLoading={this.state.isLoading}
                onClick={() => {
                  this.onSubmit()
                }}>
                Próximo
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
  updateRideInCreation: data => dispatch(updateRideInCreation(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetRideItems)
