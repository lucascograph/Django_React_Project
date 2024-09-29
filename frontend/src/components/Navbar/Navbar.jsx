import React from 'react'
import "./Navbar.css"
import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/kanji">Kanji</Link></li>
            <li><Link to="/keigo">Keigo</Link></li>
            <li><Link to="/bunpo">Bunpo</Link></li>
            <li><Link to="/logout">Logout</Link></li>
        </ul>
    </nav>
  )
}
