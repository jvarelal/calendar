import React from 'react'

const Footer = ({ ...props }) => {
    const theme = props.theme
    return <footer className="navbar-footer flex-center">
        <div>2020 - J Varela</div>
        <div>
            {theme && theme.CREATOR ? <a
                href={theme.CREATOR}
                target="_blank" rel="noopener noreferrer">
                <u>Patrón de fondo</u>
            </a> : null}
        </div>
    </footer>
}

export default Footer
