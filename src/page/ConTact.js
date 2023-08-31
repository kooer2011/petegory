import React from 'react';
import NavbarHeader from '../components/Navbar';
import ContactSelection from '../components/Contact/ContactSelection';
import Map from '../components/Contact/Map';
import { styled } from '@mui/material/styles';
import Footer from '../components/Footer/Footer';
const StyledGrooming = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(8), // Adjust the margin as needed
}));

function ConTact() {
  return (
    <div>
      <NavbarHeader />

      <ContactSelection />
      <Map />

      <Footer />
    </div>
  );
}

export default ConTact;
