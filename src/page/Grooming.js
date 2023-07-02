import React from 'react';
import NavbarHeader from '../components/Navbar'
import Gallr from '../components/Gallery/Gallr';
import UncontrolledExample from '../components/Carousel/CarouSel';
import {useNavigate} from 'react-router-dom'


import img1 from '../imgs/raw.jpg'
import img2 from '../imgs/timebussiness.PNG'
import './grooming.css';
function GrooMing() {
const navigate = useNavigate();


const navigateToBooking = () =>{
  navigate('/grooming/booking');
}






return (

 <div className='gloom_container'>
  <NavbarHeader/>
  <section className='header_grooming'>
    <h1>GROOMING</h1>
  </section>
  <section onClick={navigateToBooking} className='gloom_button'>
   Bookning
  </section>

  <section className='ressponive'>
    <img src={img1}/>
    <img src={img2}/>
  </section>
 
  
 
 </div>

)
 
 

}

export default GrooMing;
