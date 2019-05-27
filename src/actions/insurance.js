export const TOGGLE_INSURANCE_START = 'TOGGLE_INSURANCE_START'
export const TOGGLE_INSURANCE_ERROR = 'TOGGLE_INSURANCE_ERROR'
export const TOGGLE_INSURANCE_SUCCESS = 'TOGGLE_INSURANCE_SUCCESS'

export const toggleInsuranceStart = () => ({
  type: TOGGLE_INSURANCE_START
})

export const toggleInsuranceError = () => ({
  type: TOGGLE_INSURANCE_ERROR
})

export const toggleInsuranceSuccess = () => ({
  type: TOGGLE_INSURANCE_SUCCESS
})

export const toggleInsurance = () => dispatch => {
  dispatch(toggleInsuranceStart())
  dispatch(toggleInsuranceSuccess())
}
