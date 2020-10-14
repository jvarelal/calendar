import React from 'react';
import '../assets/css/App.css';
import Agenda from './components/Agenda';
import { Navbar, Container, Row, Col } from 'react-bootstrap'

function App() {
  return (
    <>
      <header style={{marginBottom: '25px'}}>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Agenda</Navbar.Brand>
        </Navbar>
      </header>
      <Container fluid>
        <Row>
          <Col>
            <Agenda />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
