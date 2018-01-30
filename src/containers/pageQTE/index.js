import React, { Component } from 'react'

import Qte from '../../components/qte'
import api from '../../common/api'

import './style.css'

class PageQTE extends Component {
  render() {
    api.get({ path: 'tree/init' }).then(console.log)

    return (
      <div className="page-qte">
        <Qte
          sequence={['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight']}
          qteType="sequence"
          time={5}
          />
      </div>
    )}
}

export default PageQTE
