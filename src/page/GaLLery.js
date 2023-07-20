import { React, useState } from 'react';
import NavbarHeader from '../components/Navbar';

import Gallr from '../components/Gallery/Gallr';
import './styles/gallery.css';
import '../index.css'
import Footer from '../components/Footer/Footer';
 


function GaLLery() {
  return (
    <div>
   
      <NavbarHeader /> <h1>GALLERY</h1>
      <Gallr />
      <Footer/>
    </div>
  );
}

export default GaLLery;
