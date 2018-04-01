import React, { Component } from 'react'

import Image from '../../components/Image'

import './style.css'

class MemberSheet extends Component {
  render() {
    const roles = this.props.member.roles
    const listItems = roles.map((item) =>
            <p className="role-text" key={item}>{item}</p>
        );
    return (
      <div className="member-sheet" style={{margin:"0 5% 0 5%"}}>
        <div>
          <Image 
            src={this.props.member.image.src} 
            alt = {this.props.member.image.alt}
            style = {{width:"100%", marginBottom:"8%"}}  
          />
        </div>
          <h3 className="name-text">{this.props.member.name}</h3>
          {listItems}
      </div>
    )}
}

export default MemberSheet
