import React from 'react';
import { Carousel } from 'antd';
import './Carousel.css';

import imgs from '../../imgs/pet-poster.jpg';
import imgs2 from '../../imgs/SHOP1.jpg';
import imgs3 from '../../imgs/COUTER1.jpg';

function UncontrolledExample() {
  return (
    <Carousel autoplay>
      <div className='carousel_imgs'>
        <img src={imgs} alt='Carousel Image 1' />
      </div>
     
    </Carousel>
  );
}

export default UncontrolledExample;
