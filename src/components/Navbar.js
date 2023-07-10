import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import img from '../imgs/petegory-logo.png';
import './nav.css';
import axios from 'axios';
import { setUser } from '../redux/features/userSlice';
// const { setUser } = userSlice.actions;

function NavbarHeader() {
  const  {user}  = useSelector(state => state.user);
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const res = await axios.post('/api/v1/user/getUserData',
        { },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          }
        }
      )
      const userData = res.data.data; 
      dispatch(setUser(userData));
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    if(!user) {
      getUser()
    }
  }, [user])

  
  return (
    <Navbar expand="lg" className="color-nav">
      <Container>
        <Navbar.Brand href="/">
          <img className="logo" src={img} alt="Logo" />
          PET’EGORY
        </Navbar.Brand>
        <Navbar.Toggle className="hamberger" />
        <Navbar.Collapse className="nav-container">
          <Nav>
            <Nav.Link className="link-hover" href="/">
              HOME
            </Nav.Link>
            <Nav.Link className="link-hover" href="/grooming">
              GROOMING
            </Nav.Link>
            <Nav.Link className="link-hover" href="/hotel">
              HOTEL
            </Nav.Link>
            <Nav.Link className="link-hover" href="/contact">
              CONTACT
            </Nav.Link>
            <Nav.Link className="link-hover" href="/gallary">
              GALLERY
            </Nav.Link>

            {user ? 
              <Nav.Link href="/profile" className='profile'>
                {user.name}
              </Nav.Link>
             : 
              <Nav.Link className="link-hover signin" href="/login">
                LOGIN
              </Nav.Link>
            }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarHeader;
