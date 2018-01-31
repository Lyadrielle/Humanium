import React, { Component } from 'react'

import './style.css'

class Choice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: props.time,
      choice: props.default,
      currentKey: null,
      captureKey: true,
    }
  }

  componentDidMount() {
    document.getElementById('defaultChoice').focus()
  }

  onKeyPressed(event) {
    event.persist()
    const { choices: { text, next } } = this.props
    const { currentKey } = this.state.currentKey

    if (!this.isTimerActive()) return

    this.setState({ captureKey: false })

    if (event.key === 'Enter') {
      this.setState({ timer: 0 })
      return
    }
    
    if (event.key === currentKey) return

    if (null) {
      
    }

  }

  isTimerActive() {
    const { timer, currentKey } = this.state
    return timer && currentKey !== 'Enter'
  }

  countDown() {
    const { timer, currentKey } = this.state
    const isTimerActive = timer && currentKey !== 'Enter'

    setTimeout(() => {
      if (this.isTimerActive()) {
        const newTimer = timer - 1
        if (newTimer) {
          this.countDown()
          return this.setState({ timer: newTimer })
        }
        return this.setState({ timer: 0 })
      }
    }, 1000)
  }
  
  render() {
    const { captureKey, timer, choice } = this.state
    const { text } = this.props
    const style = 'choice'
    this.countDown()

    return (
      <div>
        <div
          id="defaultChoice"
          className={style}
          onKeyDown={(e) => this.onKeyPressed(e)}
          onKeyUp={() => this.setState({ captureKey: true })}
          tabIndex="1"
        >
          <p>
            { text }
          </p>
        </div>
        <div
          id="defaultChoice"
          className={style}
          onKeyDown={(e) => this.onKeyPressed(e)}
          onKeyUp={() => this.setState({ captureKey: true })}
          tabIndex="1"
        >
          <p>
            { text }
          </p>
        </div>
        <p>
          { timer }
        </p>
      </div>
    )
  } 
}

export default Choice