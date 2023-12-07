import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import * as userService from '../../utilities/users-service'
import './NavBar.css'

const NavBar = ({ user, setUser }) => {
  function handleLogOut() {
    userService.logOut()
    setUser(null)
  }

  return (
    <>
      <Navbar 
        key={false} 
        expand={false} 
        className='bg-body-tertiary mb-3' 
        className='nav'
      >
        <Container fluid>
          <Navbar.Brand 
            className='nav-text'>
            Welcome, <span className='username'>{ user.name }</span>!
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement='end'
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title 
                className='title' 
                id={`offcanvasNavbarLabel-expand-${false}`}
              >
                Be a Pro Without Being a Pro!
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <Nav className='justify-content-end flex-grow-1 pe-3'>
              <Nav.Link href='/api/openAi'>New Prompt</Nav.Link>
              <Nav.Link href='/api/codes'>New Code</Nav.Link>
              <Nav.Link href='/api/math'>New Math Equation</Nav.Link>
              <Nav.Link href='' onClick={handleLogOut}>Log Out</Nav.Link>
            </Nav>
          </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar