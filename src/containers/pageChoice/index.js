import React, { Component } from 'react'

import Choice from '../../components/choice'
import api from '../../common/api'

import './style.css'

const choices = [
  {
    text: 'Resist the temptation',
    next: 'end01'
  },
  {
    text: 'Let your inner Gluton out',
    next: 'fight'
  }
]

class PageChoice extends Component {
  render() {
    return (
      <div className="page-qte">
        <Choice
          choices={choices}
          time={10}
          />
      </div>
    )}
}

export default PageChoice
