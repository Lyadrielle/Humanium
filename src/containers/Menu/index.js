import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import GlitchButton from '../../components/GlitchButton'
import ImageButton from '../../components/ImageButton'

import './style.css'

class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = { 'keepVisible': false }
  }

  showMenu() {
    if (this.state.keepVisible) {
      return true
    } else {
      return this.props.show
    }
  }

  keepMenuVisible(value) {
    if (this.props.location.pathname === '/Film') {
      this.setState({ 'keepVisible': value })
      this.props.keepVisible(value)
    }
  }

  render() {
    return (
      <div 
        className={`menu ${this.showMenu() ? '' : 'hide-menu'}`}
        onMouseOver={() => this.keepMenuVisible(true)}
        onMouseOut={() => this.keepMenuVisible(false)}
      >
        <GlitchButton
          text="Film"
          onClick={() => this.props.history.push('/Film')}
          style = {{margin:0, fontSize:"16px"}}
        />
        <ImageButton 
          onClick={() => this.props.history.push('/')}
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