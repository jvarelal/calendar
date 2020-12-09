import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { readDashboards, createDashboard } from '../../task/actions/taskActions'
import { checkSession } from '../actions/userActions'
import { THEMES, TEMPLATES } from '../../commons/util/const'
import Footer from '../../commons/components/Footer'

const LoadUser = ({ user, checkSession, readDashboards, createDashboard, children }) => {
    const THEME = THEMES[user.preferences.theme]
    const [pending, setPending] = React.useState(true)
    React.useEffect(() => checkSession({ cb: () => setPending(false) }), []) // eslint-disable-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        if (user.id)
            readDashboards({
                id: user.id,
                cb: data => {
                    if (data.length === 0)
                        createDashboard({ ...TEMPLATES.DASHBOARD.BASE, userId: user.id })
                }
            })
    }, [user.id, readDashboards, createDashboard])
    return pending ? <div className="flex-center">
        <div className="m-auto ptb-9">
            <div className="loading" /> <br />Cargando
        </div>
    </div>
        : <div className={`wrapper ${THEME.NAME}`}>
            {children}
            <Footer theme={THEME} />
        </div>
}

LoadUser.propTypes = {
    user: PropTypes.object.isRequired,
    checkSession: PropTypes.func.isRequired,
    readDashboards: PropTypes.func.isRequired,
    createDashboard: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(
    mapStateToProps,
    { readDashboards, createDashboard, checkSession }
)(LoadUser);
