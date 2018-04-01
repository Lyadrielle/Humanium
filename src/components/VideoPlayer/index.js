import React, { Component } from 'react'
import ReactPlayer from 'react-player'

import api from '../../common/api'
import VideoMenu from '../VideoMenu'
import './style.css'

document.oncontextmenu = function() {
  return false;
}

class FilmTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuHidden: true,
      videoTimeout: null,
      playing: true,
      volume: 0.8,
      muted: false,
    }
  }
  
  render() {
    const {
      menuHidden,
      videoTimeout,
      playing,
      volume,
      muted,
    } = this.state

    const {
      videoId,
      displayMenu,
      onPause,
      onPlay,
    } = this.props

      return (
      <div className='film' onMouseMove = {
        () => {
          clearTimeout(videoTimeout)
          let timeoutId = setTimeout(()=>{
            this.setState({ menuHidden: true })
          }, 2000)
          this.setState({
            menuHidden:false,
            videoTimeout: timeoutId
          })
      }}>
        <ReactPlayer
          url={api.generateVideoLink(videoId)}
          width='100%'
          height='100%'
          playing={playing}
          volume={volume}
          muted={muted}
          onPlay={() => this.setState({playing: true})}
          onPause={() => this.setState({playing: false})}
        />

        {
          displayMenu && !menuHidden ?
          <VideoMenu
            onPlayButton={(value) => {
              this.setState({playing: value})
              if (onPause && !value) onPause()
              if (onPlay && value) onPlay()
            }}
            onMuteButton={(value) => this.setState({muted: value})}
            onVolumeChange={(value) => this.setState({volume: value})}
            isPlaying={playing}
            isMuted={muted}
            volume={volume}
          /> : ''
        }
      </div>
    )}
}

export default FilmTest
