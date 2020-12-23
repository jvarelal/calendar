import React from 'react'
import { connect } from 'react-redux'
import { THEMES } from '../../util/themes'

const Footer = ({ user }) => {
    const theme = THEMES[user.preferences.theme]
    return <footer className="navbar-footer flex-center">
        <div>
            2020 - <a href="https://github.com/jvarelal"
                target="_blank" rel="noopener noreferrer">J Varela</a>
        </div>
        <div>
            {theme.CREATOR ? <a href={theme.CREATOR} target="_blank" rel="noopener noreferrer">
                <u>Creador de fondo</u>
            </a> : null}
        </div>
    </footer>
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, null)(Footer);
