import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import HeaderApp from './layout/components/HeaderApp'
import ModalManager from './layout/components/ModalManager'
import ErrorBoundary from './layout/components/ErrorBoundary'
import Footer from './layout/components/Footer'
import { LOADING } from './util/const'
import PrivateRoute from './user/components/PrivateRoute'
import LoadUser from './user/components/LoadUser'
import Page404 from '../app/layout/components/Page404'
import store from './store'

function App() {
  const navs = {
    brand: { link: '/', name: 'Agenda', icon: 'fas fa-sticky-note' },
    tabs: [
      { link: '/calendar', icon: 'fas fa-calendar-alt', name: 'Calendario', component: React.lazy(() => import('./task/components/calendar/Calendar')) },
      { link: '/dashboard', icon: 'fas fa-clipboard', name: 'Tableros', component: React.lazy(() => import('./task/components/dashboard/DashBoard')), private: true },
      { link: '/login', icon: 'fas fa-user', component: React.lazy(() => import('./user/components/Login')) },
      { link: '/', component: React.lazy(() => import('./layout/components/Home')) },
      { link: '/help', component: React.lazy(() => import('./layout/components/Help')) }
    ]
  }
  return (
    <Provider store={store}>
      <LoadUser>
        <ErrorBoundary>
          <HashRouter>
            <HeaderApp navs={navs} />
            <React.Suspense fallback={LOADING}>
              <Switch>
                {navs.tabs.map((nav, index) => nav.private ?
                  <PrivateRoute key={index} exact path={nav.link} component={nav.component} /> :
                  <Route key={index} exact path={nav.link} component={nav.component} />)}
                <Route path="*" component={Page404} />
              </Switch>
            </React.Suspense>
            <ModalManager />
            <Footer />
          </HashRouter>
        </ErrorBoundary>
      </LoadUser>
    </Provider>
  );
}

export default App
