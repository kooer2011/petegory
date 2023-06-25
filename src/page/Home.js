import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UncontrolledExample from '../components/Carousel/CarouSel';
import GridExample from '../components/Card/Card';
import NavbarHeader from '../components/Navbar';
import '../index.css'

import Fab from '../components/FAB/Fab';
import { FcAbout, FcBusinessman, FcCamera, FcFullTrash } from "react-icons/fc";

const Home = () => {
  const actions = [
    { label: "About", icon: <FcAbout />, onClick: console.log },
    { label: "Profile", icon: <FcBusinessman />, onClick: console.log },
    { label: "Picture", icon: <FcCamera />, onClick: console.log },
    { label: "Trash", icon: <FcFullTrash />, onClick: console.log },
  ];
  return (
    <div className='home_container'>
      <NavbarHeader/>
      <UncontrolledExample />
      <GridExample />
      <Fab actions={actions} />
      
    </div>
  );
};
export default Home;
