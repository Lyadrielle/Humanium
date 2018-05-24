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
    this.setState({
      QTETime: currentScene.time || 0,
    })
    video.src = videoLink
    return video.ondurationchange = () => {
      this.setState({
        videoLink,
        currentScene,
      })
    }
  }

  onQTE(state, setState) {
    return () => {
      this.setState({
        executeAction: true
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
    const { currentScene, executeAction, videoLink, QTETime } = this.state
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
          this.onQTE(this.state, (state) => this.setState(state)),
          QTETime
        )}
        {executeAction && actionMap[currentScene.type](currentScene)}
      </div>
    )
  }
}

function displayVideoPlayer(videoLink, displayMenu, onQTE, QTETime) {
  return (
    <VideoPlayer
      videoLink={videoLink}
      displayMenu={displayMenu}
      onQTE={onQTE}
      QTETime={QTETime}
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
