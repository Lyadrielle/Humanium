import React, { Component } from 'react'

import Title from '../../components/Title'
import Paragraph from '../../components/Paragraph'

import './style.css'


class TextContent extends Component {
  displayParagraphs() {
    const paragraphs = this.props.paragraphs
    const listItems = paragraphs.map((item) =>
            <Paragraph
              paragraph = {item.paragraph} 
              key={item.id} 
            />
        );
    return (
      <div>
        {listItems}
      </div>
  );
    }


    render() {
    return (
      <div className="text-content" style = {this.props.style || {}}>
        <Title title={this.props.title} />
        {this.displayParagraphs()}
      </div>

    )}
}

export default TextContent