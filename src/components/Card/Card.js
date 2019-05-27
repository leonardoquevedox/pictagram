import React from 'react'

import './Card.scss'

export default ({ children, full }) => <div className={`app-card${full ? ' app-card--full' : ''}`}>{children}</div>
