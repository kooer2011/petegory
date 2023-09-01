import { React, useState } from 'react';
import NavbarHeader from '../components/Navbar';
import { styled } from '@mui/material/styles';
import Gallr from '../components/Gallery/Gallr';
import './styles/gallery.css';
import '../index.css';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from '../components/Footer/Footer';
const StyledGrooming = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(8), // Adjust the margin as needed
}));

function GaLLery() {
  return (
    <div className="container__gallery">
      <NavbarHeader />

      <h2>GALLERY</h2>
      <Row className="mb-5 mt-3">
        <hr className="t_border my-4 ml-0 text-left" />
      </Row>

      <Gallr />

      <Footer />
    </div>
  );
}

export default GaLLery;
