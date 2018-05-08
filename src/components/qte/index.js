import React, { Component } from 'react'

import './style.css'
import BatteryCounter from '../batteryCounter';
import Key from '../Key'
class Qte extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: props.time,
      outcome: 'pending',
      nextKey: props.sequence[0],
      currentIndex: 0,
      keySuccess: null,
      captureKey: true,
    }
    this.timeout = null
  }

  componentDidMount() {
    document.getElementById('QTE').focus()
    this.countDown()
  }

  onKeyPressed(event) {
    event.persist()
    const { sequence, qteType, onComplete } = this.props
    const { currentIndex, outcome, captureKey, nextKey } = this.state

    if (outcome !== 'pending' || !captureKey) return

    this.setState({ captureKey: false })

    if (event.key !== nextKey && qteType !== 'smash') {
      this.setState(state => ({
        currentIndex: 0,
        nextKey: sequence[0],
        keySuccess: 'failure'
      }))
    }

    if (event.key === nextKey) {
      const newIndex = currentIndex + 1

      if (newIndex === sequence.length) {
        this.setState(state => ({
          outcome: 'success',
        }))
        if (onComplete) onComplete(true)
      } else {
        this.setState(state => ({
          nextKey: sequence[newIndex],
          currentIndex: newIndex,
          keySuccess: 'success'
        }))
      }
    }
  }

  isTimerActive() {
    const { outcome, timer } = this.state
    return timer && outcome !== 'success'
  }

  countDown() {
    const { onComplete } = this.props
    const { timer } = this.state

    this.timeout = setTimeout(() => {
      if (this.isTimerActive()) {
        const newTimer = timer - 1
        if (newTimer) {
          this.setState({ timer: newTimer })
          return this.countDown()
        }
        if (onComplete) {
          this.timeout = setTimeout(() => onComplete(false), 750)
        }
        return this.setState({
          outcome: 'failure',
          timer: 0
        })
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    const { nextKey, outcome, timer, keySuccess } = this.state

    return (
      <div className = "qte-container">
        {timer && (<div className="timer-qte">
          <BatteryCounter timer={this.state.timer} timeInit={this.props.time} />
        </div>)}
        <div
          id="QTE"
          className="qte"
          onKeyDown={(e) => this.onKeyPressed(e)}
          onKeyUp={() => this.setState({ keySuccess: null, captureKey: true })}
          tabIndex="1"
        > 
          {outcome === 'pending' ? <div className="key-container"><Key className={nextKey} /></div> : <p className = "pending-qte">{outcome}</p>}
          {keySuccess === 'success' && (<p className = "pending-qte">OK !</p>)}
          {keySuccess === 'failure' && (<p className = "pending-qte-error">ERROR</p>)}
        </div>
      </div>
    )
  }
}

export default Qte