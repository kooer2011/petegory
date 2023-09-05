import React, { useEffect } from 'react';
import NavbarHeader from '../components/Navbar';
import ContactSelection from '../components/Contact/ContactSelection';
import Map from '../components/Contact/Map';
import { styled } from '@mui/material/styles';
import Footer from '../components/Footer/Footer';
import AOS from 'aos';
import { motion, useScroll } from 'framer-motion';
const StyledGrooming = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(8), // Adjust the margin as needed
}));

function ConTact() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div style={{ backgroundColor: '#d7d0c8' }}>
      <NavbarHeader />
      <motion.div
        initial={{ opacity: 0, x: 100 }} // Initial animation state (sliding from right)
        animate={{ opacity: 1, x: 0 }} // Animation when a new page enters (fade-in and slide to center)
        exit={{ opacity: 0, x: -100 }} // Animation when a page exits (slide to left and fade-out)
        transition={{ duration: 0.5 }} // Animation duration
      >
        <ContactSelection />
        <Map />
      </motion.div>

      <Footer />
    </div>
  );
}

export default ConTact;
