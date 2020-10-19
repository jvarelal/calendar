import React from 'react';
import Navbar from 'react-bootstrap/Navbar'

const HeaderApp = () => {
    return <header style={{ marginBottom: '25px' }}>
        <Navbar bg="info" variant="dark">
            <Navbar.Brand href="#home">Agenda</Navbar.Brand>
        </Navbar>
    </header>
}

export default HeaderApp;