import React from 'react';
import NavbarHeader from '../components/Navbar';
import Footer from '../components/Footer/Footer';
import Paper from '@mui/material/Paper';
import img2 from '../imgs/promotion_1.jpg';
import img3 from '../imgs/dog.jpg'
import img4 from '../imgs/dog2.jpg'
import img5 from '../imgs/dog3.jpg'
import Button from '@mui/material/Button';
import './styles/grooming.css';

function GrooMing() {
  return (
    <>
      <NavbarHeader />
      <div className='ContainerBooking'>
        <div className='HeaderBooking'>
          <p className='headerText'>GroomBooking</p>
          <div className='imageBooking'>
            <Paper elevation={3} className='imagePaper'>
              <img className='responsiveImage' src={img2} alt='Time Business' />
            </Paper>
            
            <Paper elevation={3} className='imagePaper'>
            <Button variant="contained">BOOKING</Button>
            
              <p>Photo</p>
              
              <img className='responsiveImage2' src={img3} alt='Time Business' />
              <img className='responsiveImage2' src={img4} alt='Time Business' />
              <img className='responsiveImage2' src={img5} alt='Time Business' />
            </Paper>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default GrooMing;
