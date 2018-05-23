import React, { Component } from 'react'
import Image from '../Image'
import './style.css'

class BatteryCounter extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let batteryImg = 'battery_01.png'
    let newTimer = this.props.timer
    if (newTimer) {
      if (newTimer <= 9.0 * this.props.timeInit / 10.0 && newTimer > 7 * this.props.timeInit / 10.0) { batteryImg = 'battery_02.png' }
      else if (newTimer <= 7.0 * this.props.timeInit / 10.0 && newTimer > this.props.timeInit / 2.0) { batteryImg = 'battery_03.png' }
      else if (newTimer <= this.props.timeInit/2.0 && newTimer > 3.0 * this.props.timeInit / 10.0) { batteryImg = 'battery_04.png' }
      else if (newTimer <= 3.0 * this.props.timeInit / 10.0 && newTimer > 1.0 * this.props.timeInit / 10.0) { batteryImg = 'battery_05.png' }
      else if(newTimer <= this.props.timeInit / 10.0) { batteryImg = 'battery_06.png' }
    }

    return (
      <div>
          <Image
            src={`./assets/images/${batteryImg}`}
            alt="timer battery image"
            style={{
              width: "3%"
            }}
          />
      </div>
    )
  }
}

export default BatteryCounter