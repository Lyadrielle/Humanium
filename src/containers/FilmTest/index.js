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
      const totalVideoDuration = 1000 * (video.duration - (currentScene.time || 0))
      const timeout = setTimeout(() => this.setState({ executeAction: true }), totalVideoDuration)
      this.setState({
        currentScene,
        timeout,
        totalVideoDuration,
        startPayTime: (new Date()).getTime()
      })
    }
  }

  pause(state, setState) {
    return () => {
      const { startPayTime, totalVideoDuration, timeout } = state
      clearTimeout(timeout)
      const currentTime = (new Date()).getTime() - startPayTime
      const remainingTime = totalVideoDuration - currentTime
      setState({
        remainingTime
      })
    }
  }

  play(state, setState) {
    return () => {
      const { remainingTime } = state
      this.setState({
        timeout: setTimeout(() => setState({ executeAction: true }), remainingTime)
      })
    }
  }

  choiceComplete(state, setState) {
    return currentChoice => {
      const { currentScene: { choices } } = state
      const { next } = choices[currentChoice]
      const context = localStorage.getItem('context')
      api.post({
        path: 'tree/move',
        headers: { context },
        body: { next }
      }).then(({ success, newContext }) => {
        if (success) {
          localStorage.setItem('context', newContext)
        }
        window.location.reload()
      })
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
      Choice: ({ choices, time }) => displayChoice(
        choices,
        time,
        this.choiceComplete(this.state, (state) => this.setState(state))
      )
    }

    return (
      <div className="page-film">
        {video && displayVideoPlayer(
          video,
          !executeAction,
          this.pause(this.state, (state) => this.setState(state)),
          this.play(this.state, (state) => this.setState(state))
        )}
        {executeAction && actionMap[currentScene.type](currentScene)}
      </div>
    )
  }
}

function displayVideoPlayer(videoId, displayMenu, onPause, onPlay) {
  return (
    <VideoPlayer
      videoId={videoId}
      displayMenu={displayMenu}
      onPause={onPause}
      onPlay={onPlay}
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

function displayChoice(choices, time, onComplete) {
  return (
    <Choice
      choices={choices}
      time={time}
      onComplete={onComplete}
    />
  )
}

export default FilmTest
