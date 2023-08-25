import React from 'react';
import UncontrolledExample from '../components/Carousel/CarouSel';
import GridExample from '../components/Card/Card';
import NavbarHeader from '../components/Navbar';
import Gallr from '../components/Gallery/Gallr';
import Footer from '../components/Footer/Footer';
import GrooMing from './Grooming';
import HoTel from './Hotel';
import ContactSelection from '../components/Contact/ContactSelection';
import { FloatButton } from 'antd';
import './styles/userpage.css'; // Import the CSS file

const Userpage = () => {
  return (
    <div className="fade-in">
      {' '}
      {/* Add fade-in class to trigger animation */}
      <NavbarHeader />
      <UncontrolledExample />
      <GridExample />
      <h1>Gallery</h1>
      <Gallr className="gallrcontainer" />
      <br />
      <hr />
      <HoTel />
      <hr />
      <ContactSelection />
      <Footer />
      <FloatButton.BackTop tooltip={<div>Back to top</div>} type="primary" />
    </div>
  );
};

export default Userpage;
