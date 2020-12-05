import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ children }) => <header className="navbar flex-center">
    {children}
</header>

const NavElement = ({ cssClass, href, children, onClick }) => {
    return href ? <Link to={href} className={cssClass}> {children} </Link> :
        <div className={cssClass} onClick={onClick} style={{cursor: 'pointer'}}>{children}</div>
}

const NavLogo = ({ href, children, onClick }) => <NavElement
    cssClass="nav-logo" href={href} children={children} onClick={onClick} />

const NavLink = ({ href, children, onClick }) => <NavElement
    cssClass="nav-link" href={href} children={children} onClick={onClick} />

const NavDropMenu = ({ logo, children }) => <div className="nav-link user-menu">
    {logo}
    {children}
</div>

const Nav = ({ children }) => <nav>	
    <ul className="navbar-list">
        {children.length ? children.map((child, i) => <li className="nav-item" key={i}>{child}</li>) :
            <li className="nav-item">{children}</li>}
    </ul>
</nav>

Header.NavLogo = NavLogo;
Header.NavLink = NavLink;
Header.NavDropMenu = NavDropMenu;
Header.Nav = Nav

export default Header;
