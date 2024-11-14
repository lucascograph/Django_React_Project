import { Navbar } from "../components/Navbar/Navbar"
import { NavLink } from "react-router-dom"
import "./Keigo.css"
import image_1 from "../images/1.png"
import image_2 from "../images/2.png"
import image_3 from "../images/3.png"
import image_4 from "../images/4.png"
import image_5 from "../images/5.png"
import image_6 from "../images/6.png"
import image_7 from "../images/7.png"
import image_8 from "../images/8.png"

export const Keigo = () => {

    const situations = [
        {id: 1, title: "introduction", image: image_1},
        {id: 2, title: "greeting", image: image_2},
        {id: 3, title: "phonecall", image: image_3},
        {id: 4, title: "warning", image: image_4},
        {id: 5, title: "To request/deny", image: image_5},
        {id: 6, title: "Ask for permission", image: image_6},
        {id: 7, title: "Scheduling", image: image_7},
        {id: 8, title: "Visiting", image: image_8},
        {id: 9, title: "coming soon..", image: "#"}
    ]

    const handleClick = () => {
    }

    return (
        <div>
            <Navbar />
            <div className="gridbox">
                <div className="grid-container">
                    {situations.map((situation) => (
                        <div
                            key={situation.id}
                            className="grid-item"
                            onClick={handleClick}
                        >
                            <NavLink to={`/keigo/${situation.title}`}><img src={situation.image} alt={situation.title} /></NavLink>
                            <div className="overlay">{situation.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
