import React, { Component } from 'react'

import './style.css'

class Paragraph extends Component {
  render() {
    return (
        <p className = "paragraph" >{this.props.paragraph}</p>
    )}
}

export default Paragraph