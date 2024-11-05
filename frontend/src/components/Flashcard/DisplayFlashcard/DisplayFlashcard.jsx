import { useState, useContext } from "react";
import { FlashcardContext } from "../../../contexts/FlashcardContext";
import "./DisplayFlashcard.css";
import api from "../../../Api";
import { IoTrashOutline } from "react-icons/io5";
import { Popup } from "../../popup/popup";

export const DisplayFlashcard = () => {

    const {
        currentCard,
        isShowingFront,
        currentDeck,
        setCurrentCard,
        setIsShowingFront,
        setRefreshDecks,
     } =  useContext(FlashcardContext)


    const [ showPopup, setShowPopup ] = useState(false)
    const [ mousePosition, setMousePosition ] = useState({x: 0, y: 0})

    const handleDeleteIconClick = () => {
        setShowPopup(true)
        setMousePosition({x: event.clientX, y: event.clientY})
    }

    const handleClickOnCard = () => {
        setIsShowingFront(prev => !prev)
    }

    const handleDelete = async () => {

        try {
            const response = await api.delete(`/api/flashcard/delete/${currentCard.id}/`)

            console.log(response.data)

        } catch (error) {
            console.error('Error details:', error.response ? error.response.data : error.message);
        }

        setCurrentCard(null)
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
                        <div className="deck">Deck: {currentDeck?.name}</div>
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
                <Popup
                    onSubmit={handleDelete}
                    onCancel={handleCancel}
                    text={`Are you sure that you want to delete this card from '${currentDeck?.name}'`}
                    position={[mousePosition?.x, mousePosition?.y]}
                />
            )}
        </>
    );
}
