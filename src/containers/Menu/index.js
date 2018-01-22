import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import GlitchButton from '../../components/GlitchButton'

import './style.css'

class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <GlitchButton
          text="Home"
          onClick={() => this.props.history.push('/')}
          style={{ marginRight: 5 }}
        />
        <GlitchButton
          text="Project"
          onClick={() => this.props.history.push('/project')}
        />
      </div>
    )}
}

export default withRouter(Menu)
