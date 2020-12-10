import React from 'react'

const Footer = ({ ...props }) => {
    const theme = props.theme || {}
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

export default Footer
