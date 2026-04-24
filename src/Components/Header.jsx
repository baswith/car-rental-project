import React, { useContext } from 'react'
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { loginResponseContext } from '../../ContextAPI/ContextAPI';
import Button from 'react-bootstrap/esm/Button';


function Header() {
  const navigate = useNavigate()



  const { loginResponse } = useContext(loginResponseContext)
  useEffect(() => {

  }, [loginResponse])

  const logout = () => {
    sessionStorage.clear()
    navigate('/')
    // window.location.reload();


  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          {
            sessionStorage.getItem('user') ?
              <Navbar.Brand href="/home">AutoRent</Navbar.Brand>:
              <Navbar.Brand href="/">AutoRent</Navbar.Brand>
          }
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {
                !sessionStorage.getItem("user") &&
                <div className='d-flex justify-content-between'>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </div>
              }
              {
                sessionStorage.getItem("user") &&
                <>
                  <Nav.Link href='/all-cars'>Browse-Cars</Nav.Link>
                  <Nav.Link href='/booking-history'>Booking History</Nav.Link>
                  <Nav.Link href='/category'>Browse-Category</Nav.Link>
                  <Nav.Link onClick={logout}>Log Out</Nav.Link>

                </>



              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


    </>
  )
}

export default Header