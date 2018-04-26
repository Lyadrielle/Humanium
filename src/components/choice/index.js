import React, { Component } from 'react'

import BatteryCounter from '../batteryCounter';

import './style.css'

class Qte extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: props.time,
      currentChoice: 0
    }
  }

  componentDidMount() {
    const { choices } = this.props
    document.getElementById('choice').focus()
  }

  onKeyPressed(event) {
    event.persist()
    const { key } = event
    const { timer } = this.state
    if (timer) {
      if (key === 'ArrowLeft') return this.setState({ currentChoice: 0 })
      if (key === 'ArrowRight') return this.setState({ currentChoice: 1 })
      if (key === 'Enter') return this.setState({ timer: 0 })
    }
  }

  isTimerActive() {
    return this.state.timer
  }

  countDown() {
    const { timer } = this.state

    setTimeout(() => {
      if (this.isTimerActive()) {
        const newTimer = timer - 1
        if (newTimer) {
          this.countDown()
          return this.setState({ timer: newTimer })
        }
        return this.setState({
          timer: 0
        })
      }
    }, 1000)
  }

  render() {
    const { timer, currentChoice } = this.state
    const { choices, onComplete } = this.props
    const [firstChoice, secondChoice] = choices
    this.countDown()
    if (!this.isTimerActive() && onComplete) {
      onComplete(currentChoice)
    }

    return (
      <div
        id="choice"
        className="choice"
        onKeyDown={(e) => this.onKeyPressed(e)}
        tabIndex="1"
      >
        <Answer
          text={firstChoice.text}
          position={0}
          selected={currentChoice === 0}
        />
        <Answer
          text={secondChoice.text}
          position={1}
          selected={currentChoice === 1}
        />
        {timer && (<div className="timer-choice">
          <BatteryCounter timeInit = {this.props.time} timer= {this.state.timer} />
        </div>)}
      </div>
    )
  }
}

function Answer({ text, position, selected }) {
  return (
    <div
      className="answer"
      style={{
        left: `${position * 50}%`,
        backgroundColor: `rgba(0, 0, 0, ${selected ? 0.2 : 0.4})`
      }}
    >
      <div
        className="answer-text"
        style={{
          color: `rgba(255, 255, 255, ${selected ? 1 : 0.3})`,
          fontSize: `${selected ? 30 : 25}px`
        }}
      >
        {text}
      </div>
    </div>
  )
}

export default Qte