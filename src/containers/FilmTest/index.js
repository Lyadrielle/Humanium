import React, { Component } from 'react'

import VideoPlayer from '../../components/VideoPlayer'
import Qte from '../../components/qte'
import Choice from '../../components/choice'
import api from '../../common/api'

import './style.css'

class FilmTest extends Component {
  state = {
    currentScene: null,
    executeAction: false,
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

    const currentScene = nodes[nodes.length - 1]
    const video = document.createElement('video')
    video.src = api.generateVideoLink(currentScene.video)
    return video.ondurationchange = () => {
      setTimeout(() => this.setState({ executeAction: true }), 1000 * (video.duration - (currentScene.time || 0)))
      this.setState({ currentScene })
    }
  }

  componentDidMount() {
    this.loadContext()
  }

  render() {
    const { currentScene, executeAction } = this.state
    const { video } = currentScene || {}

    const actionMap = {
      Cinematic: () => null,
      QTE: () => null,
      Choice: ({ choices, time }) => displayChoice(choices, time)
    }

    return (
      <div className="page-film">
        {video && displayVideoPlayer(video)}
        {executeAction && actionMap[currentScene.type](currentScene)}
      </div>
    )
  }
}

function displayVideoPlayer(videoId) {
  return (
    <VideoPlayer
      videoId={videoId}
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

function displayChoice(choices, time) {
  return (
    <Choice
      choices={choices}
      time={time}
    />
  )
}

export default FilmTest
