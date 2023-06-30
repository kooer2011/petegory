import React from 'react';
import NavbarHeader from '../components/Navbar'
import Gallr from '../components/Gallery/Gallr';
import UncontrolledExample from '../components/Carousel/CarouSel';
// import banner from '../components/Banner/banner';

import img1 from '../imgs/raw.jpg'
import './grooming.css';
function GrooMing() {
return (
<div>
  <NavbarHeader/>
  <div className='gloom_container'>
  <div className='header_grooming'>
      <h1>Grooming</h1>
  </div>

    <p className='gloom_button'>BOOKNOW</p>
    <img className='groomimg' src={img1}/>
  
  </div>
 
  </div>);

}

export default GrooMing;
