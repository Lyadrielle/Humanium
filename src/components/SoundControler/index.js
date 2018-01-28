import React, { Component } from 'react'
import Slider from 'react-rangeslider'
import '../../../node_modules/react-rangeslider/lib/index.css'

import './style.css'

class SoundControler extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      volume: this.props.volume
    }
  }

  handleOnChange = (value) => {
    this.setState({
      volume: value
    })
    this.props.onVolumeChange(value)
  }

  render() { 
    let { volume } = this.state
    return (
      <Slider
        value={volume}
        min={0}
        max={1}
        step={0.05}
        tooltip={false}
        orientation="horizontal"
        onChange={this.handleOnChange}
        handleLabel={''}
      />
    )}
}

export default SoundControler
