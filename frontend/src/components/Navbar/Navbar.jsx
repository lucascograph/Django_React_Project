import "./Navbar.css"
import { Link, NavLink } from "react-router-dom"


export const Navbar = () => {
    return (
        <nav>
            <div className="navbar">
                <div className="logo"><Link to="/">LOGO</Link></div>
                <div className="nav-links">
                    <ul className="links">
                        <NavLink to="/flashcard"><li>Flashcards</li></NavLink>
                        <NavLink to="/kanji" className="kanji-dropdown">
                            <li>
                                Kanji
                                <ul className="kanji-dropdown-menu">
                                    <li><Link to="/kanji/n5">N5</Link></li>
                                    <li><Link to="/kanji/n4">N4</Link></li>
                                    <li><Link to="/kanji/n3">N3</Link></li>
                                    <li><Link to="/kanji/n2">N2</Link></li>
                                    <li><Link to="/kanji/n1">N1</Link></li>
                                </ul>
                            </li>
                        </NavLink>
                        <NavLink to="/keigo"><li>Keigo</li></NavLink>
                        <NavLink to="/bunpo"><li>Grammar</li></NavLink>
                    </ul>
                    <div className="logout"><Link to="/logout">Logout</Link></div>
                </div>
            </div>
        </nav>
    )
}
