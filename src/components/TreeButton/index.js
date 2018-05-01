import React, { Component } from 'react'

import './style.css'

class TreeButton extends Component {
  render() {
    return (
      <div>
        <div className="border" onClick={() => {
          this.props.onNodeSelect(this.props.index)
        }}>
          <div className="node-name">{this.props.nodeId}</div>
          <div className="losange"></div>
        </div>
      </div>
    )
  }
}

export default TreeButton