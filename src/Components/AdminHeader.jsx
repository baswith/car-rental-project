import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function AdminHeader() {
    const navigate = useNavigate()

    const logout = () => {
        sessionStorage.clear()
        navigate('/')
        // window.location.reload();


    }
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/admin">AutoRent</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">

                            <Nav.Link href='/admin'>Admin Page</Nav.Link>
                            <Nav.Link onClick={logout}>Log Out</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


        </>
    )
}

export default AdminHeader