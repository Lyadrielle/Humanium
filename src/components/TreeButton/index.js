import React, { Component } from 'react'

import './style.css'

class TreeButton extends Component {
  render() {
    return (
      <div className = "border" onClick = {()=>{
        this.props.onNodeSelect(this.props.index)
      }}>
        <div className="losange"></div>
      </div>
    )}
}

export default TreeButton