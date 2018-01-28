import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import GlitchButton from '../../components/GlitchButton'
import MemberSheet from '../MemberSheet'

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
          width={"100%"}>
            {memberCarouselFirst}
            {memberCarouselSecond}
        </Carousel>
        
        <a className="project-button-text" onClick={() => this.props.history.push('/project')}>
          Project
        </a>
      </div>
    )}
}

export default withRouter(Team)
