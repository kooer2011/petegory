import { React, useState } from 'react';
import NavbarHeader from '../components/Navbar';
import { styled } from '@mui/material/styles';
import Gallr from '../components/Gallery/Gallr';
import './styles/gallery.css';
import '../index.css';
import Footer from '../components/Footer/Footer';
const StyledGrooming = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(8), // Adjust the margin as needed
}));

function GaLLery() {
  return (
    <div>
      <NavbarHeader />

      <h1>GALLERY</h1>
      <Gallr />

      <Footer />
    </div>
  );
}

export default GaLLery;
