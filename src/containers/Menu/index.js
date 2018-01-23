import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import GlitchButton from '../../components/GlitchButton'

import './style.css'

class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <GlitchButton
          text="Film"
          onClick={() => this.props.history.push('/Film')}
        />
        <GlitchButton
          text="Humanium"
          onClick={() => this.props.history.push('/')}
        />
        <GlitchButton
          text="Project"
          onClick={() => this.props.history.push('/project')}
        />
      </div>
    )}
}

export default withRouter(Menu)