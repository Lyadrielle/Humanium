import React, { Component } from 'react'
import fscreen from 'fscreen'

import GlitchButton from '../../components/GlitchButton'
import ImageButton from '../../components/ImageButton'
import SoundControler from '../../components/SoundControler'
import DropTopButton from '../../components/DropTopButton'

import './style.css'

class VideoMenu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      'playing': false,
      'volume': 0.8,
      'mute': false,
      'quality': '1080p',
      'fullScreen': false,
      'sub': 'OFF',
      'mouseDown': false,
      'subListOpen': false,
      'qualityListOpen': false,
      'animation': ''
    }

    this.updateSubLang = this.updateSubLang.bind(this)
    this.updateQuality = this.updateQuality.bind(this)
  }

  updateSubLang (subLang) {
    this.setState({
      'sub': subLang,
      'subListOpen': false
    })
  }

  updateQuality (newQuality) {
    this.setState({
      'quality': newQuality,
      'qualityListOpen': false
    })
  }

  goFullscreen () {
    const element = document.getElementById('root')

    if (fscreen.fullscreenElement !== null) {
      fscreen.exitFullscreen()
    } else {
      fscreen.requestFullscreen(element)
    }
  }

  render () {
    const subPossibilities = ['ENG','FRA','OFF']
    const qualityPossibilities = ['1080p','720p','540p','480p']

    return (
      <div className={`video-menu ${this.props.show ? '' : 'hide-video-menu'}`}>
        <div className={`left-buttons ${this.props.show ? '' : 'hide-video-menu'}`}>
          <ImageButton
            onClick={() => {
              this.setState((prevState) => ({ 'playing': !prevState.playing }))
              this.props.onPlayButton(!this.state.playing)
            }}
            src={
              this.state.playing
                ? './assets/images/pause.svg'
                : './assets/images/play.svg'
            }
            className="play-button"
            style={{ 'height': '50%' }}
          />
          <ImageButton
            onClick={() => {
              this.setState((prevState) => ({ 'mute': !prevState.mute }))
              this.props.onMuteButton(!this.state.mute)
            }}
            src={
              this.state.mute || this.state.volume === 0
                ? './assets/images/speaker_01.svg'
                : './assets/images/speaker_04.svg'
            } // Todo : function to handle image with soundLevel
            className="sound-button"
            style={{ 'height': '50%' }}
          />
          <SoundControler
            volume={this.state.volume}
            onVolumeChange={(value) => {
              this.setState({ 'volume': value })
              this.props.onVolumeChange(value)
            }}
          />
        </div>

        <div className={`right-buttons ${this.props.show ? '' : 'hide-video-menu'}`}>
         { /*<div className="drop">
            {this.state.subListOpen
              ? <DropTopButton
                onClick={this.updateSubLang}
                currentState={this.state.sub}
                pos={subPossibilities}
              />
             : ''
            }
            <GlitchButton
              text={this.state.sub}
              style={{
                'paddingTop': '8px',
                'marginLeft': '30px',
                'marginRight': '30px'
              }}
              onClick={() => {
                this.setState((prevState) => ({ 'subListOpen': !prevState.subListOpen }))
              }}
            />
          </div>

          <div className="drop">
            {this.state.qualityListOpen
              ? <DropTopButton
                onClick={this.updateQuality}
                currentState={this.state.quality}
                pos={qualityPossibilities}
              />
             : ''
            }
            <GlitchButton
              text={this.state.quality}
              style={{
                'paddingTop': '8px',
                'marginLeft': '30px',
                'marginRight': '30px'
              }}
              onClick={() => {
                this.setState((prevState) => ({ 'qualityListOpen': !prevState.qualityListOpen }))
              }}
            />
          </div>
         */}
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

export default VideoMenu