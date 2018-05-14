import React, { Component } from 'react'
import ReactPlayer from 'react-player'

import Footer from '../Footer'

import './style.css'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      'muted': false
    }
  }

  render () {
    return (
      <div className="home">
        <ReactPlayer
          url="https://s3.eu-west-3.amazonaws.com/nomrigolo/intro_01_1920x1080.mp4"
          height="100%"
          width="auto"
          style={{margin:"auto"}}
          playing
          muted={this.state.muted}
        />
        <Footer
          onMuteButton={(value) => this.setState({ 'muted': value })}
        />
      </div>
    )
  }
}

export default Home