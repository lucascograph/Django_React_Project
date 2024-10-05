import "./DeckList.css"
import { IoTrashOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import api from "../../Api";


function DeckList({ onClick, onDelete, decks, currentDeck }) {

    const [ showPopup, setShowPopup ] = useState(false)
    const [ hoveredDeck, setHoveredDeck ] = useState(null)
    const [ deckToDelete, setDeckToDelete ] = useState(null)

    const handleDeleteIconClick = () => {
        setShowPopup(true)
        setDeckToDelete(hoveredDeck)
    }

    const handleDelete = async () => {
        setShowPopup(false)
        try {
            const response = await api.delete(`/api/flashcards/delete/deck/${deckToDelete}/`, {
                deck: deckToDelete
            })

            console.log(response.data)
        } catch (error) {
            console.error('Error details:', error.response ? error.response.data : error.message);
        }

        onDelete(prev => !prev)
    }

    const handleCancel = () => {
        setShowPopup(false)
    }

    const renderList = decks.map((deck, index) => {
        return (
            <li key={index} onClick={() => onClick(deck)}
                onMouseEnter={() => setHoveredDeck(deck)}
                onMouseLeave={() => setHoveredDeck(null)}
            >
                <div className="trashbin">
                    <IoTrashOutline onClick={handleDeleteIconClick} style={{cursor: 'pointer'}} />
                </div>
                <span style={{color : currentDeck === deck ? '#ffffff' : '#2e2e2e', backgroundColor: currentDeck === deck ? '#2e2e2e' : 'transparent'}}>
                    {deck}
                </span>
            </li>
        )
    })

    return (
        <>
        <div className="box">
            <div className="title-space">
                <h2>Decks</h2>
            </div>
            <ul>{renderList}</ul>
        </div>
            {showPopup && currentDeck && (
                <div className="popup">
                    <p>Are you sure you want to delete deck: '{currentDeck}' ?</p>
                    <div className="popup-buttons">
                        <Button onClick={handleDelete}>Yes</Button>
                        <Button onClick={handleCancel}>No</Button>
                    </div>
                </div>
            )}
        </>
    )

}

export default DeckList