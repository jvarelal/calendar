import React from 'react';
import { Nav, Navbar } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import TaskReminder from '../../calendar/components/TaskReminder'

const HeaderApp = ({ style = {}, navs = [] }) => {
    const brand = navs.filter(nav => nav.type === 'brand')
    const tabs = navs.filter(nav => nav.type === 'tab')
    const location = useLocation();
    return <header>
        <Navbar style={style.CSS} variant={style.VARIANT}>
            {brand.map((b, index) => <Link key={index} to={b.link} className="navbar-brand">
                <i className="material-icons inline-icon">{b.icon}</i> {b.name}
            </Link>)}
            <Nav className="mr-auto">
                {tabs.map((t, index) => <Link key={index}
                    to={t.link}
                    className={'nav-link' + (t.link === location.pathname ? ' active' : '')}>
                    {t.name}
                </Link>)}
            </Nav>
            <Nav className="ml-auto">
                <TaskReminder />
                <Nav.Link href="#home">Sign In</Nav.Link>
            </Nav>
        </Navbar>
    </header>
}

export default HeaderApp;