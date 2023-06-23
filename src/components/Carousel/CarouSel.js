import Carousel from 'react-bootstrap/Carousel';
import imgs from '../../imgs/pet-poster.jpg';
import imgs2 from '../../imgs/SHOP1.jpg';
import imgs3 from '../../imgs/COUTER1.jpg';
import { CCarousel } from '@coreui/react';
import { CCarouselItem } from '@coreui/react';
import { CImage } from '@coreui/react';
import './Carousel.css';
function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item className="size-img">
        <img className="d-flex w-100" src={imgs} alt="First slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="size-img">
        <img className="d-flex w-100" src={imgs2} alt="Second slide" />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="size-img">
        <img className="d-flex w-100" src={imgs3} alt="Third slide" />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
