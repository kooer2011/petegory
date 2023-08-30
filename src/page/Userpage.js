import React, { useState } from 'react';
import UncontrolledExample from '../components/Carousel/CarouSel';
import GridExample from '../components/Card/Card';
import NavbarHeader from '../components/Navbar';
import Gallr from '../components/Gallery/Gallr';
import Footer from '../components/Footer/Footer';
import GroomingComponent from '../components/Grooming/GroomingComponent';
import HoTel from './Hotel';
import ContactSelection from '../components/Contact/ContactSelection';
import { FloatButton } from 'antd';
import './styles/userpage.css'; // Import the CSS file
import TokenExpirationChecker from '../components/CheckToken/TokenExpirationChecker';
import BasicGrid from '../components/News/New';
import { TypeAnimation } from 'react-type-animation';
import AlertDialog from '../components/dialog/Dialog';
import Hotelcat from '../components/HotelComponent/Hotelcat';
const Userpage = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const handleTokenExpired = () => {
    localStorage.removeItem('token');
  };
  return (
    <div className="">
      <TokenExpirationChecker
        token={token}
        onTokenExpired={handleTokenExpired}
      />{' '}
      {/* Add fade-in class to trigger animation */}
      <section>
        <NavbarHeader />
      </section>
      <br />
      <section className="dialog__section">
        <AlertDialog />
      </section>
      <br />
      <div className="custom_text">
        <TypeAnimation
          sequence={['NEW', 100]}
          wrapper="span"
          speed={50}
          style={{ fontSize: '2em', display: 'inline-block' }}
          repeat={Infinity}
        />
      </div>
      <br />
      <section className="grid__section">
        <BasicGrid />
      </section>
      <br />
      <div className="custom_text">
        <TypeAnimation
          sequence={['GROOMING', 100]}
          wrapper="span"
          speed={50}
          style={{ fontSize: '2em', display: 'inline-block' }}
          repeat={Infinity}
        />
      </div>
      <br />
      <section className="grooming__section">
        <GroomingComponent />
      </section>
      <br />
      <div className="custom_text">
        <TypeAnimation
          sequence={['CATHOTEL', 100]}
          wrapper="span"
          speed={50}
          style={{ fontSize: '2em', display: 'inline-block' }}
          repeat={Infinity}
        />
      </div>
      <br />
      <section className="hotelcat__section">
        <Hotelcat />
      </section>
      <br />
      <section>
        <ContactSelection />
      </section>
      <br />
      <div className="custom_text">
        <TypeAnimation
          sequence={['GALLERY', 100]}
          wrapper="span"
          speed={50}
          style={{ fontSize: '2em', display: 'inline-block' }}
          repeat={Infinity}
        />
      </div>
      <br />
      <section>
        <Gallr />
      </section>
      <Footer />
      <FloatButton.BackTop tooltip={<div>Back to top</div>} type="primary" />
    </div>
  );
};

export default Userpage;
