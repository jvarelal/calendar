import React from 'react';
import '../assets/css/App.css';
import Agenda from './components/Agenda';
import { Container, Row, Col } from 'react-bootstrap'

function App() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <h3 align="center" style={{margin: '10px'}}>Agenda</h3>
        </Col>
      </Row>
      <Row>
        <Col><Agenda /></Col>
      </Row>
    </Container>
  );
}

export default App;
