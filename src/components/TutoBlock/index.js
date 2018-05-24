import React, { Component } from 'react'

import './style.css'

class TutoBlock extends Component {


  render() {
    const { name } = this.props
    return (
      <div>
        <h5>{name}</h5>
        <img className="tutoImg" src={`../../../public/assets/images/tuto/${name}Tuto.png`} alt={name}/>
        <img className="tutoImg" src={`../../../public/assets/images/tuto/${name}Example.gif`} alt={name}/>
      </div>
    )
  }
}

export default TutoBlock
