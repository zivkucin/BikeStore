import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/authContext';

function Header() {
  
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext.isAuthenticated;
  const setIsAuthenticated = authContext.setIsAuthenticated;

  const signout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        setIsAuthenticated(false);
    }
  };
  
  return (
    <Navbar sticky="top" bg="light" variant="light" style={{ borderBottom: '2px solid red', paddingLeft: '5%' }}>
        <Container>
          <Navbar.Brand href="/"><img src="./logoDvaTocka.jpg" alt="Na ToČkovima" width={142} height={45} /></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Početna</Nav.Link>
            <Nav.Link href="/products">Proizvodi</Nav.Link>
            {isAuthenticated ?(         
              <>
                <Nav.Link href="/" onClick={signout}>Odjavi se</Nav.Link>
                <Nav.Link href="/userDashboard">Profil</Nav.Link>
                <Nav.Link href="/cart">Korpa</Nav.Link>
              </>   
            ):(
              <Nav.Link href="/login">Prijavi se</Nav.Link>
              )
            }
          </Nav>
        </Container>
      </Navbar>
  );
}

export default Header;

