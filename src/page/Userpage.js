import React,{useEffect} from 'react'
import UncontrolledExample from '../components/Carousel/CarouSel';
import GridExample from '../components/Card/Card';
import NavbarHeader from '../components/Navbar';
import Gallr from '../components/Gallery/Gallr';
import Footer from '../components/Footer/Footer';


const Userpage = () => {
  
  return (
    <>
      <NavbarHeader/>
      <UncontrolledExample />
      <GridExample />
      <h1>Gallery</h1> 
      <Gallr className ='gallrcontainer'/>
      <Footer/>
    </>
  )
}

export default Userpage