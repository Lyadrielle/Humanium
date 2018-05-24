import React, { Component } from 'react'

import VideoPlayer from '../../components/VideoPlayer'
import Qte from '../../components/qte'
import Choice from '../../components/choice'
import MobileGuard from '../MobileGuard'
import api from '../../common/api'
import { isMobile } from 'react-device-detect';

import './style.css'

class Film extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentScene: null,
      executeAction: false,
    }
  }

  async loadContext() {
    const retryLoadContext = () => setTimeout(this.loadContext, 1000)
    let context = localStorage.getItem('context')
    if (!context) {
      const { success, newContext } = await api.get({ path: 'tree/init' })
      if (!success) return retryLoadContext()
      localStorage.setItem('context', newContext)
      context = newContext
    }
    const { success, status, nodes } = await api.get({ path: 'tree/read-path', headers: { context } })
    if (!success) {
      if (status === 500) localStorage.removeItem('context')
      return retryLoadContext()
    }

    const currentScene = nodes[nodes.length - 1]
    const video = document.createElement('video')
    const videoLink = currentScene.videoLink || api.generateVideoLink(currentScene.video)
    video.src = videoLink
    return video.ondurationchange = () => {
      const totalVideoDuration = 1000 * (video.duration - (currentScene.time || 0))
      const timeout = setTimeout(() => this.setState({ executeAction: true }), totalVideoDuration)
      this.setState({
        videoLink,
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

  nextScene(next) {
    const context = localStorage.getItem('context')
    api.post({
      path: 'tree/move',
      headers: { context },
      body: { next }
    }).then(({ success, newContext }) => {
      if (success) {
        localStorage.setItem('context', newContext)
        this.setState({ executeAction: false, currentScene: null })
        this.loadContext()
      }
    })
  }

  choiceComplete(state) {
    return currentChoice => {
      const { currentScene: { choices } } = state
      const { next } = choices[currentChoice]
      this.nextScene(next)
    }
  }

  QTEComplete(state) {
    return success => {
      const { currentScene } = state
      const next = success ? currentScene.success : currentScene.failure
      this.nextScene(next)
    }
  }

  componentDidMount() {
    if (!isMobile) {
      this.loadContext() 
    }
  }

  componentWillUnmount() {
    const timeout = this.state.timeout
    clearTimeout(timeout)
  }

  render() {
    const { currentScene, executeAction, videoLink } = this.state
    const { video } = currentScene || {}

    const actionMap = {
      Cinematic: () => {
        const { currentScene: { next } } = this.state
        if (next) this.nextScene(next)
      },
      QTE: ({ qteType, sequence }) => displayQTE(
        qteType,
        sequence,
        this.QTEComplete(this.state)
      ),
      Choice: ({ choices, time }) => displayChoice(
        choices,
        time,
        this.choiceComplete(this.state)
      )
    }

    if (isMobile) {
      return (
        <div className="app">
          <MobileGuard message={MobileGuard.messages.mobile}/>
        </div>
      )
    }

    return (
      <div className="page-film">
        {video && displayVideoPlayer(
          videoLink,
          !executeAction,
          this.pause(this.state, (state) => this.setState(state)),
          this.play(this.state, (state) => this.setState(state))
        )}
        {executeAction && actionMap[currentScene.type](currentScene)}
      </div>
    )
  }
}

function displayVideoPlayer(videoLink, displayMenu, onPause, onPlay) {
  return (
    <VideoPlayer
      videoLink={videoLink}
      displayMenu={displayMenu}
      onPause={onPause}
      onPlay={onPlay}
    />
  )
}

function displayQTE(qteType, sequence, onComplete) {
  return (
    <Qte
      sequence={sequence}
      qteType={qteType}
      time={5}
      onComplete={onComplete}
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

export default Film
