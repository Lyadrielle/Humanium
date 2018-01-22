import React, { Component } from 'react'

import './style.css'

class GlitchButton extends Component {
  render() {
    return (
      <button
        className="glitch"
        onClick={
          this.props.onClick ||
          (() => { console.log('Warning: This button does not have an action !') })
        }
        data-text={this.props.text}
        style={this.props.style || {}}
      >
        {this.props.text}
      </button>
    )}
}

export default GlitchButton
