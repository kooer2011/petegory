import React from 'react'
import UncontrolledExample from '../components/Carousel/CarouSel';
import GridExample from '../components/Card/Card';
import NavbarHeader from '../components/Navbar';
import Gallr from '../components/Gallery/Gallr';

const Userpage = () => {
  return (
    <>
      <NavbarHeader/>
      <UncontrolledExample />
      <GridExample />
      <h1>Gallery</h1> 
      <Gallr className ='gallrcontainer'/>
    </>
  )
}

export default Userpage