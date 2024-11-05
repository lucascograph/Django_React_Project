import "./Navbar.css"
import { Link, NavLink } from "react-router-dom"


export const Navbar = () => {
//   return (
//     <div>
//         <nav>
//           <li className="home"><Link to="/">Home</Link></li>
//           <ul>
//             <li><NavLink to="/flashcard">Flashcard</NavLink></li>
//             <li><NavLink to="/kanji">Kanji</NavLink></li>
//             <li><NavLink to="/keigo">Keigo</NavLink></li>
//             <li><NavLink to="/bunpo">Bunpo</NavLink></li>
//         </ul>
//           <li className="logout"><Link to="/logout">Logout</Link></li>
//       </nav>
//     </div>
//   )
    return (
        <nav>
            <div className="navbar">
                <div className="logo"><Link to="/">LOGO</Link></div>
                <div className="nav-links">
                    <ul className="links">
                        <NavLink to="/flashcard"><li>Flashcards</li></NavLink>
                        <NavLink to="/kanji"><li>Kanji</li></NavLink>
                        <NavLink to="/keigo"><li>Keigo</li></NavLink>
                        <NavLink to="/grammar"><li>Grammar</li></NavLink>
                    </ul>
                    <div className="logout"><Link to="/logout">Logout</Link></div>
                </div>
            </div>
        </nav>
    )
}
