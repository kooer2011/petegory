import { React, useState } from 'react';
import NavbarHeader from '../components/Navbar';
import { styled } from '@mui/material/styles';
import Gallr from '../components/Gallery/Gallr';
import './styles/gallery.css';
import '../index.css';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from '../components/Footer/Footer';
import { motion, useScroll } from 'framer-motion';
const StyledGrooming = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(8), // Adjust the margin as needed
}));

function GaLLery() {
  return (
    <div className="container__gallery">
      <NavbarHeader />
      <motion.div
        initial={{ opacity: 0, x: 100 }} // Initial animation state (sliding from right)
        animate={{ opacity: 1, x: 0 }} // Animation when a new page enters (fade-in and slide to center)
        exit={{ opacity: 0, x: -100 }} // Animation when a page exits (slide to left and fade-out)
        transition={{ duration: 0.5 }} // Animation duration
      >
        <h2 style={{ color: 'black' }}>GALLERY</h2>
        <Row className="mb-5 mt-3">
          <hr className="t_border my-4 ml-0 text-left" />
        </Row>

        <Gallr />

        <Footer />
      </motion.div>
    </div>
  );
}

export default GaLLery;
