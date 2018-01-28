import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import GlitchButton from '../../components/GlitchButton'
import Image from '../../components/Image'

import './style.css'

class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <GlitchButton
          text="Film"
          onClick={() => this.props.history.push('/Film')}
          style = {{margin:0, fontSize:"16px"}}
        />
        <Image 
          src="./assets/images/title.svg"
          alt="title"
          style = {{height:"50%", margin:"0 15% 0 15%"}}
        />
        <GlitchButton
          text="Project"
          onClick={() => this.props.history.push('/project')}
          style = {{margin:0, fontSize:"16px"}}
        />
      </div>
    )}
}

export default withRouter(Menu)