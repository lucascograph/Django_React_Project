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
                        <NavLink to="/kanji"><li>Kanji</li></NavLink>
                        <NavLink to="/keigo"><li>Keigo</li></NavLink>
                        <NavLink to="/bunpo"><li>Grammar</li></NavLink>
                    </ul>
                    <div className="logout"><Link to="/logout">Logout</Link></div>
                </div>
            </div>
        </nav>
    )
}
