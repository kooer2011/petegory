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
        <img className="d-block w-100" src={imgs} alt="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="size-img">
        <img className="d-block w-100" src={imgs2} alt="Second slide" />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="size-img">
        <img className="d-block w-100" src={imgs3} alt="Third slide" />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
