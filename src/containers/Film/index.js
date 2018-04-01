import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import './style.css'
import VideoMenu from '../VideoMenu'

document.oncontextmenu = function () {
  return false
}

class Film extends Component {
  constructor (props) {
    super(props)
    this.state = {
      'showMenus': false,
      'myTimeout': null,
      'playing': false,
      'volume': 0.8,
      'muted': false,
      'keepVisible': false
    }
  }

  componentWillMount () {
    this.props.menuVisibility(this.state.showMenus)
  }

  componentWillUnmount () {
    clearTimeout(this.state.myTimeout)
    this.props.menuVisibility(true)
  }

  render () {
    return (
      <div
        className="film"
        onMouseMove={() => {
          clearTimeout(this.state.myTimeout)
          let timeoutId = null

          if (!this.state.keepVisible) {
            timeoutId = setTimeout(() => {
              this.setState({ 'showMenus': false })
              this.props.menuVisibility(false)
            }, 2000)
          }

          this.setState({
            'showMenus': true,
            'myTimeout': timeoutId
          })
          this.props.menuVisibility(true)
        }}
      >
        <ReactPlayer
          url="./assets/videos/test.mp4"
          width="100%"
          height="100%"
          playing={this.state.playing}
          volume={this.state.volume}
          muted={this.state.muted}
          onPlay={() => this.setState({ 'playing': true })}
          onPause={() => this.setState({ 'playing': false })}
        />

        <div
          onMouseOver={() => this.setState({ 'keepVisible': true })}
          onMouseOut={() => this.setState({ 'keepVisible': false })}
        >
          <VideoMenu
            onPlayButton={(value) => this.setState({ 'playing': value })}
            onMuteButton={(value) => this.setState({ 'muted': value })}
            onVolumeChange={(value) => this.setState({ 'volume': value })}
            show={this.state.showMenus || this.props.keepVisible}
          />
        </div>
      </div>
    )
  }
}

export default Film