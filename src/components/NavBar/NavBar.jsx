import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './NavBar.css'

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <>
      <Navbar key={false} expand={false} className="bg-body-tertiary mb-3 nav" className='nav'>
        <Container fluid>
          <Navbar.Brand className='nav-text'>Welcome, { user.name }! Be a Pro Without Being a Pro!</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
          <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${false}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title className='title' id={`offcanvasNavbarLabel-expand-${false}`}>
                  WORD-IQ
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/api/openAi">New Prompt</Nav.Link>
                  <Nav.Link href="/api/codes">New Code</Nav.Link>
                  <Nav.Link href="" onClick={handleLogOut}>Log Out</Nav.Link>
                </Nav>
          </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  )
}