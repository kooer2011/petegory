import imgs from '../../imgs/pet-poster.jpg';
import imgs2 from '../../imgs/SHOP1.jpg';
import imgs3 from '../../imgs/COUTER1.jpg';
import { Carousel } from 'antd';
import './Carousel.css';
function UncontrolledExample() {
  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  return (
    <Carousel autoplay>
      <div>
        <img src={imgs} />
      </div>
      <div>
        <img src={imgs2} />
      </div>
    </Carousel>
  );
}

export default UncontrolledExample;
