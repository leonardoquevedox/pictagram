import React from 'react'

import './Form.scss'

export default props => (
  <form {...props} noValidate className="app-form">
    {props.children}
  </form>
)
