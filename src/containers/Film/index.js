import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import './style.css'
import VideoMenu from '../VideoMenu'

document.oncontextmenu = function() {
  return false;
}

class Film extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuHidden : true,
      myTimeout : null,
      playing : false,
      volume : 0.8,
      muted : false
    }
  }
  
  render() {
      return (
      <div className='film' onMouseMove = {
        () => {
          clearTimeout(this.state.myTimeout)
          let timeoutId = setTimeout(()=>{
            this.setState({menuHidden: true})
          }, 2000)
          this.setState({
            menuHidden:false,
            myTimeout: timeoutId
          })
      }}>
      <ReactPlayer 
        url='./assets/videos/test.mp4'
        width='100%'
        height='100%'
        playing={this.state.playing}
        volume={this.state.volume}
        muted={this.state.muted}
        onPlay={() => this.setState({playing: true})}
        onPause={() => this.setState({playing: false})}
      />

        {
          this.state.menuHidden ? '' : 
            <VideoMenu 
              onPlayButton={(value) => this.setState({playing: value})}
              onMuteButton={(value) => this.setState({muted: value})}
              onVolumeChange={(value) => this.setState({volume: value})}
              isPlaying={this.state.playing}
              isMuted={this.state.muted}
              volume={this.state.volume}
            />
        }
      </div>
    )}
}

export default Film
