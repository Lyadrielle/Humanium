import React, { Component } from 'react'

import TextContent from '../TextContent'
import NoInteractionSlider from '../NoInteractionSlider'
import './style.css'

class ProjectRow extends Component {
  render() {
    return (
      <div className="project-row">
        <NoInteractionSlider images={this.props.images}/>
        <TextContent 
          paragraphs={this.props.paragraphs} 
          style={{maxWidth: "40%", paddingLeft:"50px"}} 
          title="PROJECT"
        />
      </div>
    )}
}

export default ProjectRow
