import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import UncontrolledExample from '../components/Carousel/CarouSel';
import GridExample from '../components/Card/Card';
import NavbarHeader from '../components/Navbar';
import '../index.css'
import Dashboard from './Dashboard';
import Userpage from './Userpage';

import Gallr from '../components/Gallery/Gallr';

import Fab from '../components/FAB/Fab';
import { FcAbout, FcBusinessman, FcCamera, FcFullTrash } from "react-icons/fc";

const Home = () => {
  const actions = [
    { label: "About", icon: <FcAbout />, onClick: console.log },
    { label: "Profile", icon: <FcBusinessman />, onClick: console.log },
    { label: "Picture", icon: <FcCamera />, onClick: console.log },
    { label: "Trash", icon: <FcFullTrash />, onClick: console.log },
  ];

  const navigate = useNavigate();

    const [role, setRole] = useState('')

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/user')
            .then(res => {
                if(res.data.valid) {
                    setRole(res.data.role)
                } else {
                    navigate('/login')
                }
            })
            .catch(err => console.log(err))
    }, [])

  return (
    <div className='home_container'>
      {role == 'user' && <Userpage/>}
      {role === 'admin' && <Dashboard/>}
    
    </div>
  );
};
export default Home;
