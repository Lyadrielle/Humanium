import React, { Component } from 'react'
import fscreen from 'fscreen'
import ImageButton from '../../components/ImageButton'

import './style.css'

class Footer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      'mute': false,
      'fullScreen': false
    }
  }

  componentWillMount () {
    let isFullscreen = false

    if (fscreen.fullscreenElement !== null) {
      isFullscreen = true
    }
    this.setState({ 'fullScreen': isFullscreen })
  }

  goFullscreen () {
    const element = document.body

    if (fscreen.fullscreenElement !== null) {
      fscreen.exitFullscreen()
    } else {
      fscreen.requestFullscreen(element)
    }
  }

  render () {
    return (
      <div className="footer">
        <div className="left-buttons">
          <a href="https://www.facebook.com/HumaniumInteractiveMovie/" target="blank" style={{ 'height': '50%' }}>
            <ImageButton
              src={'./assets/images/facebook.svg'}
              alt={'facebook-icon'}
            />
          </a>
        </div>
        <div className="center-buttons" />
        <div className="right-buttons">
          <ImageButton
           onClick={() => {
            this.setState((prevState) => ({ 'mute': !prevState.mute }))
            this.props.onMuteButton(!this.state.mute)
          }}      
            src={
              this.state.mute || this.state.volume === 0
                ? './assets/images/speaker_01.svg'
                : './assets/images/speaker_04.svg'
            }
            style={{ 'height': '50%' }}
          />
          <ImageButton
            onClick={() => {
              this.setState((prevState) => ({ 'fullScreen': !prevState.fullScreen }))
              this.goFullscreen()
            }}
            src={
              this.state.fullScreen
                ? './assets/images/windowed.svg'
                : './assets/images/fullscreen.svg'
            }
            className="screen-button"
            style={{ 'height': '50%' }}
          />
        </div>
      </div>
    )
  }
}

export default Footer