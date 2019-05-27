/**
 * @license MIT
 * @version 1.1.0
 * @author Trinca
 * @description User information page.
 */

import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Page, List, Link } from 'framework7-react'
import VMasker from 'vanilla-masker'

import { createRiskForm } from '../../actions/user'

import arrowIcon from '../../assets/vectors/arrow.svg'

import PrimaryButton from '../../components/PrimaryButton'
import PrimaryInput from '../../components/PrimaryInput'
import CheckboxInput from '../../components/CheckboxInput'
import Navbar from '../../components/Navbar'
import Step from '../../components/Step'

import './RiskForm.scss'

class RiskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      riskForm: {
        condutorPrincipal: true,
        cpfCondutor: '',
        displayCpfCondutor: '',
        estadoCivil: '',
        sexo: '',
        residemComPrincipalCondutor: false,
        acceptsTheTerms: false,
        utilizamVeiculo: ''
      }
    }
  }

  componentDidMount() {}

  onSubmit() {
    const { riskForm } = this.state
    this.setState({ isLoading: true })
    this.props
      .createRiskForm({ ...riskForm })
      .then(() => {
        this.$f7router.navigate({ name: 'SynchronizationFeedback' })
      })
      .catch(e => {
        this.$f7.dialog.alert(
          'Por favor, verifique as informações preenchidas e tente novamente.',
          'Houve uma falha na operação'
        )
      })
      .then(() => {
        this.setState({ isLoading: false })
      })
  }

  canGoBack() {
    const { f7router } = this.props
    const { history } = f7router
    return history.length > 0
  }

  render() {
    const pageTitle = 'Argo Instant: Cadastro'
    const { riskForm } = this.state
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

    const renderSteps = () => (
      <div>
        <Step done />
        <Step done />
        <Step done />
      </div>
    )

    return (
      <Page className="risk-form-page">
        <Helmet title={pageTitle} />
        <Navbar className="risk-form-page__navbar">
          <div className="app-navbar__left">{renderBackButton()}</div>
          <div className="app-navbar__center app-navbar__title">Formulário de risco</div>
          <div className="app-navbar__right">{renderSteps()}</div>
        </Navbar>
        <div className="risk-form-page__content">
          <div className="risk-form-page__intro">
            Para finalizar precisamos preencher o formulário de risco
          </div>
          <List className="risk-form-page__form">
            <div className="risk-form-page__form__field-group">
              <div className="risk-form-page__form__field-group__title">
                O segurado é o condutor principal do veículo?
              </div>
              <div className="risk-form-page__form__field-group__inputs">
                <CheckboxInput
                  checked={riskForm.condutorPrincipal}
                  onClick={() =>
                    this.setState({ riskForm: { ...riskForm, condutorPrincipal: true } })
                  }>
                  Sim
                </CheckboxInput>
                <CheckboxInput
                  checked={!riskForm.condutorPrincipal}
                  onClick={() =>
                    this.setState({ riskForm: { ...riskForm, condutorPrincipal: false } })
                  }>
                  Não
                </CheckboxInput>
              </div>
              <div className="risk-form-page__form__field-group__title">CPF do condutor</div>
              <div className="risk-form-page__form__field-group__inputs">
                <PrimaryInput
                  value={riskForm.displayCpfCondutor}
                  placeholder="999.999.999-99"
                  onChange={e => {
                    this.setState({
                      riskForm: {
                        ...riskForm,
                        cpfCondutor: VMasker.toNumber(e.target.value),
                        displayCpfCondutor: VMasker.toPattern(`${e.target.value}`, '999.999.999-99')
                      }
                    })
                  }}
                />
              </div>
            </div>
            <div className="risk-form-page__form__field-group">
              <div className="risk-form-page__form__field-group__title">Estado civil</div>
              <div className="risk-form-page__form__field-group__inputs">
                <CheckboxInput
                  checked={riskForm.estadoCivil === 'single'}
                  onClick={() =>
                    this.setState({ riskForm: { ...riskForm, estadoCivil: 'single' } })
                  }>
                  Solteiro(a)
                </CheckboxInput>
                <CheckboxInput
                  checked={riskForm.estadoCivil === 'married'}
                  onClick={() =>
                    this.setState({ riskForm: { ...riskForm, estadoCivil: 'married' } })
                  }>
                  Casado(a) ou união estável
                </CheckboxInput>
                <CheckboxInput
                  checked={riskForm.estadoCivil === 'widow'}
                  onClick={() =>
                    this.setState({ riskForm: { ...riskForm, estadoCivil: 'widow' } })
                  }>
                  Viúvo(a)
                </CheckboxInput>
                <CheckboxInput
                  checked={riskForm.estadoCivil === 'divorced'}
                  onClick={() =>
                    this.setState({ riskForm: { ...riskForm, estadoCivil: 'divorced' } })
                  }>
                  Divorciado(a) / separado(a)
                </CheckboxInput>
              </div>
            </div>
            <div className="risk-form-page__form__field-group">
              <div className="risk-form-page__form__field-group__title">
                Residem com o principal condutor pessoas na faixa etária de 17 a 25 anos?
              </div>
              <div className="risk-form-page__form__field-group__inputs">
                <CheckboxInput
                  checked={!riskForm.residemComPrincipalCondutor}
                  onClick={() =>
                    this.setState({ riskForm: { ...riskForm, residemComPrincipalCondutor: false } })
                  }>
                  Não
                </CheckboxInput>
                <p
                  className={`risk-form-page__small-letters ${
                    riskForm.residemComPrincipalCondutor ? 'hidden' : ''
                  }`}>
                  Estou ciente que esta resposta reduz o prêmio pago. Compreendi que se no momento do sinistro o veículo estiver sendo utilizado por condutores residentes de 18 a 25 anos, não haverá indenização, pois será considerado risco não contratado, exceto se comprovado por documentos idôneos que trata de emergência médica.
                </p>
                <CheckboxInput
                  checked={riskForm.residemComPrincipalCondutor}
                  onClick={() =>
                    this.setState({ riskForm: { ...riskForm, residemComPrincipalCondutor: true } })
                  }>
                  Sim
                </CheckboxInput>
                <div className={`${!riskForm.residemComPrincipalCondutor ? 'hidden' : ''}`}>
                  <CheckboxInput
                    transparent="true"
                    checked={riskForm.utilizamVeiculo === 'none'}
                    onClick={() =>
                      this.setState({ riskForm: { ...riskForm, utilizamVeiculo: 'none' } })
                    }>
                    Sim e não utilizam o veículo. Estou ciente que esta resposta reduz o prêmio pago. Compreendi que se no momento do sinistro o veículo estiver sendo utilizado por condutores residentes de 18 a 25 anos, não haverá indenização, pois será considerado risco não contratado, exceto se comprovado por documentos idôneos que se trata de emergência médica.
                  </CheckboxInput>
                  <CheckboxInput
                    transparent="true"
                    checked={riskForm.utilizamVeiculo === 'sporadic'}
                    onClick={() =>
                      this.setState({
                        riskForm: { ...riskForm, utilizamVeiculo: 'sporadic' }
                      })
                    }>
                    Sim, na faixa etária de 18 a 25 anos e utilizam o veículo até 2 dias da semana.
                  </CheckboxInput>
                  <CheckboxInput
                    transparent="true"
                    checked={riskForm.utilizamVeiculo === 'the_oldest_is_a_minor'}
                    onClick={() =>
                      this.setState({
                        riskForm: { ...riskForm, utilizamVeiculo: 'the_oldest_is_a_minor' }
                      })
                    }>
                    Sim, o(s) residente(s) mais velho(s) possui(em) 17 anos no momento da contratação do seguro.
                  </CheckboxInput>
                </div>
              </div>
            </div>
            <PrimaryButton
              isLoading={this.state.isLoading}
              onClick={() => {
                this.onSubmit()
              }}>
              Próximo
            </PrimaryButton>
          </List>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  createRiskForm: () => dispatch(createRiskForm())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RiskForm)
