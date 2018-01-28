import React, { Component } from 'react'

import './style.css'

class ImageButton extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.state
  }

  render() {
    return (
      <img
        className={this.props.className + " image-button"}
        onClick = {
          this.props.onClick ||
          (() => { console.log('Warning: This button does not have an action !') })
        }
        src={this.props.src}
        alt={this.props.alt}
        style={this.props.style || {}}
      />
    )}
}

export default ImageButton
