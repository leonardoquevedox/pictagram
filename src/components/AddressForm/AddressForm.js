import React from 'react'
import { connect } from 'react-redux'
import VMasker from 'vanilla-masker'

import PrimaryInput from '../PrimaryInput'

import utilsService from '../../services/utils'

import './AddressForm.scss'

class AddressForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.values || {
      cep: '',
      street: '',
      streetNumber: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: ''
    }
  }

  handleCepChange(rawCep) {
    const cep = VMasker.toPattern(rawCep, '99999-999').toUpperCase()

    if (cep.length === 9)
      utilsService.consultCep(cep.replace('-', '')).then(data => {
        if (!data.error && data.cep)
          this.update({
            cep,
            street: data.logradouro,
            streetNumber: this.state.streetNumber,
            complement: this.state.complement,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf
          })
      })

    this.update({
      cep,
      street: '',
      streetNumber: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: ''
    })
  }

  handleChange(value, property) {
    this.update({ ...this.state, [property]: value })
  }

  update(value) {
    this.setState(value)
    const { onChange } = this.props

    if (onChange) onChange(value)
  }

  render() {
    return (
      <React.Fragment>
        <PrimaryInput
          value={this.state.cep}
          onChange={e => this.handleCepChange(e.target.value)}
          required
          colorTheme="blue"
          label="CEP"
          type="text"
          disabled={this.props.disabled}
        />
        {this.state.street && (
          <React.Fragment>
            <PrimaryInput
              value={this.state.street}
              disabled
              colorTheme="blue"
              label="Rua"
              type="text"
            />
            <PrimaryInput
              value={this.state.streetNumber}
              onChange={e => this.handleChange(e.target.value, 'streetNumber')}
              required
              colorTheme="blue"
              label="Número"
              type="text"
              disabled={this.props.disabled}
            />
            <PrimaryInput
              value={this.state.complement}
              onChange={e => this.handleChange(e.target.value, 'complement')}
              required
              colorTheme="blue"
              label="Complemento"
              type="text"
              disabled={this.props.disabled}
            />
            <PrimaryInput
              value={this.state.neighborhood}
              disabled
              colorTheme="blue"
              label="Bairro"
              type="text"
            />
            <div className="form-row-70-30">
              <PrimaryInput
                value={this.state.city}
                disabled
                colorTheme="blue"
                label="Cidade"
                type="text"
              />
              <PrimaryInput
                value={this.state.state}
                disabled
                colorTheme="blue"
                label="Estado"
                type="text"
              />
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressForm)
