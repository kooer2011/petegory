import React from 'react';
import { Carousel } from 'antd';
import './Carousel.css';

import imgs from '../../imgs/pet-poster.jpg';

function UncontrolledExample() {
  return (
    <Carousel autoplay>
      <div className="carousel_imgs">
        <img src={imgs} alt="Carousel Image 1" />
      </div>
    </Carousel>
  );
}

export default UncontrolledExample;
