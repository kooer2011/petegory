import { React, useState } from 'react';
import NavbarHeader from '../components/Navbar';

// import img2 from '../imgs/raw2.jpg';
// import img3 from '../imgs/CatHeros.jpg';
// import img4 from '../imgs/COUTER1.jpg';
import Gallr from '../components/Gallery/Gallr';
import './gallery.css';
import '../index.css'
import Footer from '../components/Footer/Footer';
 


function GaLLery() {
  return (
    <div>
      {' '}
      <NavbarHeader /> <h1>GALLERY</h1>
      <Gallr />
      <Footer/>
    </div>
  );
}

export default GaLLery;
