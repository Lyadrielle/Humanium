import React, { Component } from 'react'

import './style.css'

class Image extends Component {
  render() {
    return (
         <img className="image" style={this.props.style|| {}} src={this.props.src} alt={this.props.alt} />
   )}
}

export default Image