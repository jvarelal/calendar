import React from 'react';
import '../assets/css/App.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HeaderApp from './components/HeaderApp'
import ModalManager from './components/ModalManager'
import CalendarTable from './components/CalendarTable'
import TaskList from './components/TaskList'
import YearMonthControl from './components/YearMonthControl'

function App() {
  return (
    <>
      <HeaderApp />
      <Container fluid>
        <Row>
          <Col xs={8}>
            <YearMonthControl />
            <CalendarTable />
          </Col>
          <Col>
            <TaskList/>
            <ModalManager/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
