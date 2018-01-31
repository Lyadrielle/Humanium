import React, { Component } from 'react'

import './style.css'

class Qte extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: props.time,
      outcome: 'pending',
      nextKey: props.sequence[0],
      keySuccess: null,
      captureKey: true,
    }
  }

  componentDidMount() {
    document.getElementById('QTE').focus()
  }

  onKeyPressed(event) {
    event.persist()
    const { sequence, qteType } = this.props

    if (this.state.outcome !== 'pending' || !this.state.captureKey) return

    this.setState({ captureKey: false })

    if (event.key !== this.state.nextKey && qteType !== 'smash') {
      this.setState(state => ({
         nextKey: sequence[0],
         keySuccess: 'failure'
      }))
    }

    if (event.key === this.state.nextKey) {
      const newIndex = sequence.indexOf(this.state.nextKey) + 1

      if (newIndex === sequence.length) {
        this.setState(state => ({
          outcome: 'success',
        }))
      } else {
        this.setState(state => ({
          nextKey: sequence[newIndex],
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
    const { outcome, timer } = this.state
    const isTimerActive = timer && outcome !== 'success'

    setTimeout(() => {
      if (this.isTimerActive()) {
        const newTimer = timer - 1
        if (newTimer) {
          this.countDown()
          return this.setState({ timer: newTimer })
        }
        return this.setState({
          outcome: 'failure',
          timer: 0,
        })
      }
    }, 1000)
  }
  
  render() {
    const { nextKey, outcome, timer, keySuccess } = this.state
    const style = 'pending-qte'
    this.countDown()

    return (
      <div
        id="QTE"
        className="qte"
        onKeyDown={(e) => this.onKeyPressed(e)}
        onKeyUp={() => this.setState({ keySuccess: null, captureKey: true })}
        tabIndex="1"
      >
        <p className={style}>
          { outcome === 'pending' ? nextKey : outcome }
        </p>
        <p>
          { timer }
        </p>
        {keySuccess === 'success' && (<p>OK !</p>)}
        {keySuccess === 'failure' && (<p>NON COUILLON !</p>)}
      </div>
    )
  } 
}

export default Qte