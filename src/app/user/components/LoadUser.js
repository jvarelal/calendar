import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { readDashboards, createDashboard } from '../../task/actions/taskActions'
import { checkSession } from '../actions/userActions'
import { TEMPLATES, LOADING, ROLES } from '../../util/const'
import { THEMES } from '../../util/themes'

const LoadUser = ({ user, checkSession, readDashboards, createDashboard, children }) => {
    const THEME = THEMES[user.preferences.theme]
    const [pending, setPending] = React.useState(true)
    React.useEffect(() => checkSession({ cb: () => setPending(false) }), []) // eslint-disable-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        if (user.id)
            readDashboards({
                email: user.email,
                cb: data => {
                    if (data.length === 0)
                        createDashboard({
                            ...TEMPLATES.DASHBOARD.BASE,
                            author: user.email,
                            roles: [{email: user.email, rol: ROLES.AUTOR}],
                            members: [user.email]
                        })
                }
            })
    }, [user.id]) // eslint-disable-line react-hooks/exhaustive-deps
    return pending ? LOADING :
        <div className={`wrapper ${THEME.NAME}`}>
            {children}
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
