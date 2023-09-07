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
import AOS from 'aos';
import 'aos/dist/aos.css';
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
    AOS.init({ duration: 3000 });
  }, []);
  return (
    <div className="homepage">
      <TokenExpirationChecker
        token={token}
        onTokenExpired={handleTokenExpired}
      />

      <section className="page_navebarsection">
        <NavbarHeader />
      </section>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        <section className="dialog__section" data-aos="fade">
          <UncontrolledExample />
        </section>
        <br />
        <div className="custom_text">
          <TypeAnimation
            sequence={(['NEWS', 1000], ['ข่าวสาร', 1000])}
            wrapper="span"
            speed={50}
            style={{
              fontSize: '2em',
              display: 'inline-block',
              fontFamily: 'ChakraPetchBold',
              color: 'black',
              fontWeight: 'bold',
            }}
            repeat={Infinity}
          />
        </div>
        <br />
        <div className="grid__section" data-aos="fade-up">
          <BasicGrid />
        </div>
        <br />
        <div className="custom_text">
          <TypeAnimation
            sequence={(['GROOMING', 1000], ['บริการ อาบน้ำ ตัดขน', 1000])}
            wrapper="span"
            speed={50}
            style={{
              fontSize: '2em',
              display: 'inline-block',
              fontFamily: 'ChakraPetchBold',
              color: 'black',
              fontWeight: 'bold',
            }}
            repeat={Infinity}
          />
        </div>
        <br />
        <div className="grooming__section" data-aos="fade-left">
          <GroomingComponent />
        </div>
        <br />
        <div className="custom_text">
          <TypeAnimation
            sequence={(['CATHOTEL', 1000], ['โรงแรมแมว', 3000])}
            wrapper="span"
            speed={50}
            style={{
              fontSize: '2em',
              display: 'inline-block',
              fontFamily: 'ChakraPetchBold',
              color: 'black',
              fontWeight: 'bold',
            }}
            repeat={Infinity}
          />
        </div>
        <br />
        <div className="hotelcat__section" data-aos="fade-right">
          <Hotelcat />
        </div>
        <br />
        <div className="custom_text">
          <TypeAnimation
            sequence={['GALLERY', 1000]}
            wrapper="span"
            speed={50}
            style={{
              fontSize: '2em',
              display: 'inline-block',
              fontFamily: 'ChakraPetchBold',
              color: 'black',
              fontWeight: 'bold',
            }}
            repeat={Infinity}
          />
        </div>
        <br />
        <div className="gallery__section" data-aos="zoom-in">
          <Gallr />
        </div>
        <br />
        <div className="contact__section" data-aos="fade-up">
          <ContactSelection />
        </div>
        <div>
          <FloatButton.BackTop
            style={{ backgroundColor: 'red' }}
            tooltip={
              <div style={{ backgroundColor: 'black', color: 'white' }}>
                Back to top
              </div>
            }
            type="primary"
          />
        </div>

        <Footer />
      </motion.div>
    </div>
  );
};

export default Userpage;
