import React, { Component } from 'react'

import Image from '../../components/Image'
import Paragraph from '../../components/Paragraph'

import './style.css'

class MemberSheet extends Component {
  render() {
    const roles = this.props.member.roles
    const listItems = roles.map((item) =>
            <span key={item}> {item}</span>
        );
    return (
      <div className="member-sheet" style={{margin:"0 5% 0 5%"}}>
        <div>
          <Image 
            src={this.props.member.image.src} 
            alt = {this.props.member.image.alt}
            style = {{width:"100%"}}  
          />
        </div>
          <h3>{this.props.member.name}</h3>
          {listItems}
      </div>
    )}
}

export default MemberSheet
