import React, { Component } from 'react'
import {Carousel} from 'react-responsive-carousel'

import Image from '../../components/Image'

import './style.css'

class NoInteractionSlider extends Component {
    render() {
      const images = this.props.images
      const listItems = images.map((item) =>
              <div>
                <Image
                src={item.src} 
                alt={item.alt}
                key={item.alt} 
                />
              </div>
          )
          
    return ( 
        <div className = "no-interaction-slider">
            <Carousel
                showArrows= {false}
                showStatus ={false}
                showIndicators={false}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                width={"100%"}>
                {listItems}
            </Carousel>
        </div>
    )
    }
}

export default NoInteractionSlider