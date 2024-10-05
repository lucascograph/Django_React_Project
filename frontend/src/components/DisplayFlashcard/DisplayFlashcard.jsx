import { useState, useContext, useEffect } from "react";
import { FlashcardContext } from "../../contexts/FlashcardContext";
import "./DisplayFlashcard.css";
import api from "../../Api";
import { IoTrashOutline } from "react-icons/io5";
import { Button } from "../Button/Button";
import DeckList from "../DeckList/DeckList";


export const DisplayFlashcard = () => {

    const {
        currentCard,
        isShowingFront,
        exportCode,
        setIsShowingFront,
        setRefreshDecks,
     } =  useContext(FlashcardContext)

    const [ showPopup, setShowPopup ] = useState(false)

    const handleDeleteIconClick = () => {
        setShowPopup(true)
    }

    const handleClickOnCard = () => {
        setIsShowingFront(prev => !prev)
    }

    const handleDelete = async () => {

        try {
            const response = await api.delete(`/api/flashcards/delete/${currentCard["id"]}/`,{
                id: currentCard["id"],
                deck: currentCard["deck"]
            })

            console.log(response.data)

        } catch (error) {
            console.error('Error details:', error.response ? error.response.data : error.message);
        }

        setRefreshDecks(prev => !prev)
        setShowPopup(false)
    }

    const handleCancel = () => {
        setShowPopup(false)
    }


    return (
        <>
            <div className="card" onClick={handleClickOnCard}>
                <div className="top">
                    <IoTrashOutline className="trash-icon" onClick={handleDeleteIconClick} style={{cursor: 'pointer'}} />
                    <div className="card-info">
                        <div className="deck">Deck: {currentCard["deck"]}</div>
                        <div className="created">Created: {currentCard["date_created"].split("T")[0]}</div> {/* date: 2024-01-01T04:27...... */}
                    </div>
                </div>
                <div className="text-box">
                    <div className="text">
                        <a>
                            {isShowingFront ? currentCard["front"] : currentCard["back"]}
                        </a>
                    </div>
                </div>
            </div>
            {showPopup && (
                <div className="popup-box">
                    <p>Are you sure you want to delete this card from '{currentCard["deck"]}' ?</p>
                    <div className="popup-buttons">
                        <Button onClick={handleDelete} >Yes</Button>
                        <Button onClick={handleCancel}>No</Button>
                    </div>
                </div>
            )}
        </>
    );
}
