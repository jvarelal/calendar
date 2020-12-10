import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import HeaderApp from './commons/components/HeaderApp'
import ModalManager from './commons/components/ModalManager'
import { LOADING } from './commons/util/const'
import PrivateRoute from './user/components/PrivateRoute'
import LoadUser from './user/components/LoadUser'
import store from './store'

function App() {
  const navs = {
    brand: { link: '/', name: 'Agenda', icon: 'fas fa-sticky-note' },
    tabs: [
      { link: '/calendar', icon: 'fas fa-calendar-alt', name: 'Calendario', component: React.lazy(() => import('./task/components/calendar/Calendar')) },
      { link: '/dashboard', icon: 'fas fa-clipboard', name: 'Tableros', component: React.lazy(() => import('./task/components/dashboard/DashBoard')), private: true },
      { link: '/list', icon: 'fas fa-columns', name: 'Listado por fecha', component: React.lazy(() => import('./task/components/calendar/TaskDatePanel')), private: true },
      { link: '/login', icon: 'fas fa-user', component: React.lazy(() => import('./user/components/Login')) },
      { link: '/', icon: 'fas fa-home', component: React.lazy(() => import('./commons/components/Home')) }
    ]
  }
  return (
    <Provider store={store}>
      <LoadUser>
        <HashRouter>
          <HeaderApp navs={navs} />
          <React.Suspense fallback={LOADING}>
            <Switch>
              {navs.tabs.map((nav, index) => nav.private ?
                <PrivateRoute key={index} exact path={nav.link} component={nav.component} /> :
                <Route key={index} exact path={nav.link} component={nav.component} />)}
            </Switch>
          </React.Suspense>
          <ModalManager />
        </HashRouter>
      </LoadUser>
    </Provider>
  );
}

export default App
