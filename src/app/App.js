import React from 'react';
import '../assets/css/App.css';
import Agenda from './components/Agenda';
import HeaderApp from './components/HeaderApp'
import { SYSDATE } from './util/utilConts'

function App() {
  const minYear = SYSDATE.getFullYear() - 5;
  const maxYear = SYSDATE.getFullYear() + 10;
  return (
    <>
      <HeaderApp/>
      <Agenda minYear={minYear} maxYear={maxYear}/>
    </>
  );
}

export default App;
