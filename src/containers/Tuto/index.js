import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import './style.css'

import * as data from './tuto.json'

const images = data.images
const texts = data.description
class Tuto extends Component {
  render() {
    return (
      <div className="tuto">
      </div>
    )}
}

export default withRouter(Tuto)
