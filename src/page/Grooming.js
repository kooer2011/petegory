import React from 'react';
import NavbarHeader from '../components/Navbar';
import Gallr from '../components/Gallery/Gallr';
import UncontrolledExample from '../components/Carousel/CarouSel';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

import img1 from '../imgs/raw.jpg';
import img2 from '../imgs/timebussiness.PNG';
import './styles/grooming.css';

function GrooMing() {
  const navigate = useNavigate();

  const navigateToBooking = () => {
    navigate('/grooming/booking');
  };

  const showNavbar = true;

  return (
    <>
      <div className="gloom_container">
        {showNavbar && <NavbarHeader />}
        <section className="header_grooming">
          <h1>GROOMING</h1>
        </section>
        <section onClick={navigateToBooking} className="gloom_button">
          Booking
        </section>

        <section className="responsive_gallery">
          <div className="responsive_img">
            <img
              style={{ width: 500 }}
              className="fade-in"
              src={img1}
              alt="Grooming Image 1"
            />
          </div>
          <div className="responsive_img">
            <img
              style={{ width: 500 }}
              className="fade-in"
              src={img2}
              alt="Grooming Image 2"
            />
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default GrooMing;
