import React, { Component } from 'react'

import GlitchButton from '../../components/GlitchButton'

import './style.css'


class DropTopButton extends Component {
  displayPossibilities() {
    const pos = this.props.pos;
    const listItems = pos.map((item, index) =>
      <li key={index}>
       <GlitchButton onClick={() => {this.props.onClick(item)}} text = {item}/>
      </li>
    )
    console.log(listItems)
    return (
      <ul className = "drop-possibilities">{listItems}</ul>
    )
  }
  

  render() { 
    return (
      <div>
              {this.displayPossibilities()}
      </div>

    )}
}

export default DropTopButton
