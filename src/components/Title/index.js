import React, { Component } from 'react'

import './style.css'

class Title extends Component {
  render() {
    return (
      <h2 className="title">{this.props.title}</h2>
    )}
}

export default Title