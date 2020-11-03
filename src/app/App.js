import React from 'react';
import '../assets/css/App.css';
import { HashRouter, Route, Switch } from 'react-router-dom'
import HeaderApp from './commons/components/HeaderApp'
import ModalManager from './commons/components/ModalManager'
import TaskDashBoard from './calendar/components/TaskDashBoard'
import Calendar from './calendar/components/Calendar'
import TaskDatePanel from './calendar/components/TaskDatePanel'
import Login from './user/components/Login'
import PrivateRoute from './user/components/PrivateRoute'
import { THEMES } from './commons/util/const'
import { getRandomNumber } from './commons/util/func'

function App() {
  const theme = THEMES[getRandomNumber(0, THEMES.length -1)]
  let navs = [
    { link: '/', type: 'brand', name: 'Notas', icon: 'book', component: TaskDashBoard, private: true },
    { link: '/dashboard', type: 'tab', name: 'Pendientes', component: TaskDashBoard, private: true },
    { link: '/calendar', type: 'tab', name: 'Calendario', component: Calendar },
    { link: '/list', type: 'tab', name: 'Listado por fecha', component: TaskDatePanel, private: true },
    { link: '/login', component: Login }
  ]
  return (
    <div className={theme.NAME}>
      <HashRouter>
        <HeaderApp style={theme.NAV} navs={navs} />
        <Switch>
          {navs.map((nav, index) => nav.private ?
            <PrivateRoute key={index} exact path={nav.link} component={nav.component} /> :
            <Route key={index} exact path={nav.link} component={nav.component} />)}
        </Switch>
        <ModalManager />
      </HashRouter>
    </div>
  );
}

export default App;
