import React, { Component } from 'react'

import './style.css'

class TutoBlock extends Component {


  render() {
    const { name } = this.props
    return (
      <div className='tuto-block'>
        <h5>{name}</h5>
        <img className="tuto-img" src={`./assets/images/tuto/${name}Tuto.png`} alt={name}/>
        <img className="exemple-img" src={`./assets/images/tuto/${name}Example.gif`} alt={name}/>
      </div>
    )
  }
}

export default TutoBlock