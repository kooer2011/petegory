import React from 'react';
import NavbarHeader from '../components/Navbar';
import ContactSelection from '../components/Contact/ContactSelection'
import Map from '../components/Contact/Map'
import Footer from '../components/Footer/Footer';
function ConTact() {
  return(
    <div>
      <NavbarHeader/> 
     <ContactSelection/>
     <Map/>
     <Footer/>

    </div>
  )
}

export default ConTact;
