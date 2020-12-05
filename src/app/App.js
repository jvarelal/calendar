import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import HeaderApp from './commons/components/HeaderApp'
import ModalManager from './commons/components/ModalManager'
import DashBoard from './task/components/dashboard/DashBoard'
import Calendar from './task/components/calendar/Calendar'
import TaskDatePanel from './task/components/calendar/TaskDatePanel'
import Login from './user/components/Login'
import PrivateRoute from './user/components/PrivateRoute'
import LoadUser from './user/components/LoadUser'
import Home from './commons/components/Home';

function App() {
  let navs = {
    brand: { link: '/', name: 'Postick', icon: 'fas fa-sticky-note', component: DashBoard },
    tabs: [
      { link: '/dashboard', icon: 'fas fa-clipboard', name: 'Pendientes', component: DashBoard, private: true },
      { link: '/calendar', icon: 'fas fa-calendar-alt', name: 'Calendario', component: Calendar },
      { link: '/list', icon: 'fas fa-columns', name: 'Listado por fecha', component: TaskDatePanel, private: true },
      { link: '/login', icon: 'fas fa-user', component: Login },
      { link: '/', icon: 'fas fa-home', component: Home }
    ]
  }
  return (
    <LoadUser>
      <HashRouter>
        <HeaderApp navs={navs} />
        <Switch>
          {navs.tabs.map((nav, index) => nav.private ?
            <PrivateRoute key={index} exact path={nav.link} component={nav.component} /> :
            <Route key={index} exact path={nav.link} component={nav.component} />)}
        </Switch>
        <ModalManager />
      </HashRouter>
    </LoadUser>
  );
}

export default App
