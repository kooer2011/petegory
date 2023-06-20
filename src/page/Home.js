import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UncontrolledExample from '../components/Carousel/CarouSel';
import GridExample from '../components/Card/Card';
import NavbarHeader from '../components/Navbar';

const Home = () => {
  return (
    <div>
      <NavbarHeader/>
      <UncontrolledExample />
      <GridExample />
      
    </div>
  );
};
export default Home;
