import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TaskReminder from '../../task/components/TaskReminder'
import NavSetting from '../../user/components/NavSetting'
import Header from '../../commons/components/Header'

const HeaderApp = ({ navs = {}, user }) => {
    const tabs = navs.tabs.filter(t => t.name)
    return <Header>
        <Header.NavLogo href={navs.brand.link}>
            <i className={navs.brand.icon} /> <span><i>{navs.brand.name}</i></span>
        </Header.NavLogo>
        <Header.Nav>
            {tabs.map((t, index) => <Header.NavLink key={index} href={t.link}>
                <i className={t.icon + ' icon'} /> <span>{t.name}</span>
            </Header.NavLink>)}
        </Header.Nav>
        <Header.Nav>
            {user.id ? <TaskReminder /> : null}
            {user.id ? <NavSetting /> :
                <Header.NavLink href='/login'>
                    <i className="fas fa-user" /> <span>Iniciar sesión</span>
                </Header.NavLink>}
        </Header.Nav>
    </Header>
}

HeaderApp.propTypes = {
    user: PropTypes.object.isRequired,
    navs: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, null)(HeaderApp);
