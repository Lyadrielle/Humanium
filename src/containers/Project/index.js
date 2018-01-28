import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import GlitchButton from '../../components/GlitchButton'
import ProjectRow from '../ProjectRow'

import './style.css'

import * as data from './project.json'

const images = data.images
const texts = data.description
class Project extends Component {
  render() {
    return (
      <div className="project">
        <ProjectRow 
          images={images} 
          paragraphs={texts} 
        />
         <a className="project-button-text" 
          onClick={() => this.props.history.push('/team')}>
            Team
         </a>
      </div>
    )}
}

export default withRouter(Project)
