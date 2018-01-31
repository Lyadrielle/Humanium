import React, { Component } from 'react'

import VideoPlayer from '../../components/VideoPlayer'
import Qte from '../../components/qte'
import Choice from '../../components/choice'
import api from '../../common/api'

import './style.css'

class FilmTest extends Component {
  state = {
    currentScene: null
  }

  async loadContext() {
    const retryLoadContext = () => setTimeout(this.loadContext, 1000)
    const context = localStorage.getItem('context')
    if (!context) {
      const { success, newContext, currentNode } = await api.get({ path: 'tree/init' })
      if (!success) return retryLoadContext()
      localStorage.setItem('context', newContext)
      return this.setState({ currentScene: currentNode })
    }
    const { success, status, nodes } = await api.get({ path: 'tree/read-path', headers: { context } })
    if (!success) {
      if (status === 500) localStorage.removeItem('context')
      return retryLoadContext()
    }
    return this.setState({ currentScene: nodes[nodes.length - 1] })
  }

  componentDidMount() {
    this.loadContext()
  }

  render() {
    const { currentScene } = this.state
    const { video } = currentScene || {}

    return (
      <div className="page-film">
        {video && displayVideoPlayer(video)}
      </div>
    )
  }
}

function displayVideoPlayer(videoId) {
  return (
    <VideoPlayer
      videoId="intro"
    />
  )
}

function displayQTE() {
  return (
    <Qte
      sequence={['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight']}
      qteType="sequence"
      time={5}
    />
  )
}

function displayChoice() {
  
}

export default FilmTest
