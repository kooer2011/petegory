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
        <Navbar.Toggle className='hamberger' />
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
              GALLARY
            </Nav.Link>
            <Nav.Link className="link-hover signin" href="/login">
              LOGIN
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
 

    
  );
}

export default NavbarHeader;
