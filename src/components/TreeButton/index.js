import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'

import './style.css'

class TreeButton extends Component {
  render() {
    return (
      <div>
        <div data-tip={this.props.node.name} className="border" onClick={() => {
          this.props.onNodeSelect(this.props.node, this.props.percentage)
        }}>
          <div className="node-name">{this.props.node.title}</div>
          <div className="losange"></div>
        </div>
        <ReactTooltip place="bottom" effect="solid"/>
      </div>
    )
  }
}

export default TreeButton