import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import GlitchButton from '../../components/GlitchButton'
import ImageButton from '../../components/ImageButton'

import './style.css'

class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hide: true
    }
  }

  render() {
    const { history } = this.props
    const { hide } = this.state
    const keepVisible = !window.location.href.includes('/film')
    return (
      <div 
        className={`menu ${hide && !keepVisible ? 'hide-menu' : ''}`}
        onMouseOver={() => this.setState({ hide: false })}
        onMouseOut={() => this.setState({ hide: true })}
      >
        <GlitchButton
          text="Film"
          onClick={() => history.push('/Intro')}
          style = {{margin:0, fontSize:"16px"}}
        />
        <GlitchButton
          text="Tutorial"
          onClick={() => history.push('/project')}
          style = {{margin:0, fontSize:"16px"}}
        />
        <ImageButton 
          onClick={() => history.push('/')}
          src="./assets/images/title.svg"
          alt="title"
          style = {{height:"50%", margin:"0 15% 0 15%"}}
        />
        <GlitchButton
          text="Projet"
          onClick={() => history.push('/project')}
          style = {{margin:0, fontSize:"16px"}}
        />
      </div>
    )}
}

export default withRouter(Menu)