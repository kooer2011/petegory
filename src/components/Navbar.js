import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import img from '../imgs/petegory-logo.png';
import './nav.css';

import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import Home from '../page/Home';
import GrooMing from '../page/Grooming';
import HoTel from '../page/Hotel';
import ConTact from '../page/ConTact';
import GaLLery from '../page/GaLLery';
import SignUp from '../page/SignUp';
import { Button } from 'react-bootstrap';

function BasicExample() {
  return (
    <BrowserRouter>
      <div>
        <Navbar expand="lg" className="color-nav">
          <Container>
            <Navbar.Brand href="/">
              <img className="logo" src={img} />
              PET’EGORY
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="nav-container">
              <Nav>
                <Nav.Link className="link-hover" href="/">
                  HOME
                </Nav.Link>
                <Nav.Link className="link-hover" href="/groom1">
                  GROOMING
                </Nav.Link>
                <Nav.Link className="link-hover" href="/hotel_1">
                  HOTEL
                </Nav.Link>
                <Nav.Link className="link-hover" href="/contact_1">
                  CONTACT
                </Nav.Link>
                <Nav.Link className="link-hover" href="/gallary">
                  GALLARY
                </Nav.Link>
                <Nav.Link className="link-hover signin" href="/signin_1">
                  SIGNIN
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/groom1" element={<GrooMing />} />
        <Route path="/hotel_1" element={<HoTel />} />
        <Route path="/contact_1" element={<ConTact />} />
        <Route path="/gallary" element={<GaLLery />} />
        <Route path="/signin_1" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default BasicExample;
