import { useState } from "react";
import "./DisplayFlashcard.css";
import api from "../../Api";
import { IoTrashOutline } from "react-icons/io5";
import { Button } from "../Button/Button";


export const DisplayFlashcard = ({ id, deck, text, date, onDelete }) => {

    const [ showPopup, setShowPopup ] = useState(false)

    const handleDeleteIconClick = () => {
        setShowPopup(true)
    }

    const handleDelete = async () => {

        try {
            const response = await api.delete(`/api/flashcards/delete/${id}/`,{
                id: id,
                deck: deck
            })

            console.log(response.data)

        } catch (error) {
            console.error('Error details:', error.response ? error.response.data : error.message);
        }

        onDelete(prev => !prev)


        setShowPopup(false)
    }

    const handleCancel = () => {
        setShowPopup(false)
    }


    return (
        <>
            <div className="card">
                <div className="top">
                    <IoTrashOutline className="trash-icon" onClick={handleDeleteIconClick} style={{cursor: 'pointer'}} />
                    <div className="card-info">
                        <div className="deck">Deck: {deck}</div>
                        <div className="created">Created: {date.split("T")[0]}</div> {/* date: 2024-01-01T04:27...... */}
                    </div>
                </div>
                <div className="text-box">
                    <div className="text">
                        <a>
                            {text}
                        </a>
                    </div>
                </div>
            </div>
            {showPopup && deck && (
                <div className="popup-box">
                    <p>Are you sure you want to delete this card from '{deck}' ?</p>
                    <div className="popup-buttons">
                        <Button onClick={handleDelete} >Yes</Button>
                        <Button onClick={handleCancel}>No</Button>
                    </div>
                </div>
            )}
        </>
    );
}
