import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import img from '../imgs/petegory-logo.png';
import './nav.css';



function NavbarHeader() {
  return (
    
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
            <Nav.Link className="link-hover signin" href="/Login">
              SIGNIN
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
 

    
  );
}

export default NavbarHeader;
