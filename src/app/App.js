import React from 'react';
import '../assets/css/App.css';
import { Container, Row, Col } from 'react-bootstrap'
import HeaderApp from './commons/components/HeaderApp'
import ModalManager from './commons/components/ModalManager'
import Calendar from './calendar/components/Calendar'
import GeneralInfo from './commons/components/GeneralInfo'

function App() {
  return (
    <>
      <HeaderApp />
      <Container>
        <Row>
          <Col>
            <GeneralInfo />
          </Col>
        </Row>
      </Container>
      <Calendar />
      <ModalManager />
    </>
  );
}

export default App;
