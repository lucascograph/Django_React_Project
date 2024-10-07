import "./Navbar.css"
import { Link, NavLink } from "react-router-dom"

export const Navbar = () => {
  return (
    <div>
        <nav>
          <li className="home"><Link to="/">Home</Link></li>
          <ul>
            <li><NavLink to="/flashcard">Flashcard</NavLink></li>
            <li><NavLink to="/kanji">Kanji</NavLink></li>
            <li><NavLink to="/keigo">Keigo</NavLink></li>
            <li><NavLink to="/bunpo">Bunpo</NavLink></li>
        </ul>
          <li className="logout"><Link to="/logout">Logout</Link></li>
      </nav>
    </div>
  )
}
