import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import ProjectRow from '../ProjectRow'
import ImageButton from '../../components/ImageButton'

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
        <div className = "team-button">
          <ImageButton 
            className="team-image-button"

            onClick={() => this.props.history.push('/team')}
            src="./assets/images/logo.svg"
            alt="logo humanium"
          />
          <a className="team-button-text" 
            onClick={() => this.props.history.push('/team')}>
              Team
          </a>
        </div>
      </div>
    )}
}

export default withRouter(Project)
