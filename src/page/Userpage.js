import React, { useState, useEffect } from 'react';
import UncontrolledExample from '../components/Carousel/CarouSel';
import GridExample from '../components/Card/Card';
import NavbarHeader from '../components/Navbar';
import Gallr from '../components/Gallery/Gallr';
import Footer from '../components/Footer/Footer';
import GroomingComponent from '../components/Grooming/GroomingComponent';
import HoTel from './Hotel';
import ContactSelection from '../components/Contact/ContactSelection';
import { FloatButton } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './styles/userpage.css'; // Import the CSS file
import TokenExpirationChecker from '../components/CheckToken/TokenExpirationChecker';
import BasicGrid from '../components/News/New';
import AOS from 'aos'
import 'aos/dist/aos.css'

import { TypeAnimation } from 'react-type-animation';

import { motion, useScroll } from 'framer-motion';
import Hotelcat from '../components/HotelComponent/Hotelcat';
const Userpage = () => {
  const { scrollYProgress } = useScroll();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const handlenavigate = () => {
    navigate('/hotel');
  };

  const handleTokenExpired = () => {
    localStorage.removeItem('token');
  };

  useEffect(() => {
    AOS.init({duration: 2000})
  }, []);
  return (
    <>
      <TokenExpirationChecker
        token={token}
        onTokenExpired={handleTokenExpired}
      />
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      <section>
        <NavbarHeader />
      </section>
      <br />
      <section className="dialog__section" data-aos='fade'>
        <UncontrolledExample />
      </section>
      <br />
      <div className="custom_text">
        <TypeAnimation
          sequence={['NEW', 100]}
          wrapper="span"
          speed={50}
          style={{
            fontSize: '2em',
            display: 'inline-block',
            fontFamily: 'ChakraPetchBold',
          }}
          repeat={Infinity}
        />
      </div>
      <br />
      <section className="grid__section" data-aos='fade-up'>
        <BasicGrid />
      </section>
      <br />
      <div className="custom_text">
        <TypeAnimation
          sequence={['GROOMING', 100]}
          wrapper="span"
          speed={50}
          style={{
            fontSize: '2em',
            display: 'inline-block',
            fontFamily: 'ChakraPetchBold',
          }}
          repeat={Infinity}
        />
      </div>
      <br />
      <section className="grooming__section" data-aos='fade-left'>
        <GroomingComponent />
      </section>
      <br />
      <div className="custom_text">
        <TypeAnimation
          sequence={['CATHOTEL', 100]}
          wrapper="span"
          speed={50}
          style={{
            fontSize: '2em',
            display: 'inline-block',
            fontFamily: 'ChakraPetchBold',
          }}
          repeat={Infinity}
        />
      </div>
      <br />
      <section className="hotelcat__section" data-aos='fade-right'>
        <Hotelcat />
      </section>
      <br />
      <div className="custom_text">
        <TypeAnimation
          sequence={['GALLERY', 100]}
          wrapper="span"
          speed={50}
          style={{
            fontSize: '2em',
            display: 'inline-block',
            fontFamily: 'ChakraPetchBold',
          }}
          repeat={Infinity}
        />
      </div>
      <br />
      <section className="gallery__section" data-aos='zoom-in'>
        <Gallr />
      </section>
      <br />
      <section data-aos='fade-up'>
        <ContactSelection />
      </section>
      <FloatButton.BackTop tooltip={<div>Back to top</div>} type="primary"  />
      <Footer/>
    </>
  );
};

export default Userpage;
