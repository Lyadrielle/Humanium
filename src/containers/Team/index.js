import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import MemberSheet from '../MemberSheet'
import ImageButton from '../../components/ImageButton'

import './style.css'

import * as data from './team.json'
import { Carousel } from 'react-responsive-carousel';

const members = data
class Team extends Component {
  render() {
    const memberCarouselFirst = <div className = "slide-team-members"><MemberSheet member={members[0]}/><MemberSheet member={members[1]}/></div>
    const memberCarouselSecond = <div className = "slide-team-members"><MemberSheet member={members[2]}/><MemberSheet member={members[3]}/></div>

    return (
      <div className="team">
        <Carousel
          showStatus ={false}
          showIndicators={false}
          showThumbs={false}
          width={"100%"}
          infiniteLoop={true}
          >
            {memberCarouselFirst}
            {memberCarouselSecond}
        </Carousel>
        <div className = "project-button">
          <ImageButton 
            className = "project-image-button"
            onClick={() => this.props.history.push('/project')}
            src="./assets/images/logo.svg"
            alt="logo humanium"
          />
        <a className="project-button-text" onClick={() => this.props.history.push('/project')}>
          Project
        </a>
        </div>
      </div>
    )}
}

export default withRouter(Team)
