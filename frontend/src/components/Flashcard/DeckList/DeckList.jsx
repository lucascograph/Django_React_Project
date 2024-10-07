import { useState, useContext } from "react";
import { FlashcardContext } from "../../../contexts/FlashcardContext";
import "./DeckList.css"
import { IoTrashOutline } from "react-icons/io5";
import { Button } from "../../Button/Button";
import api from "../../../Api";


function DeckList() {

    const {
        deckList,
        currentDeck,
        setCurrentCard,
        setCurrentDeck,
        setExportCode,
        setIsShowingFront,
        setRefreshDecks
    } = useContext(FlashcardContext)

    const [ showPopup, setShowPopup ] = useState(false)
    const [ hoveredDeck, setHoveredDeck ] = useState(null)
    const [ deckToDelete, setDeckToDelete ] = useState(null)

    const handleSelectDeck = (deck) => {
        setCurrentDeck(deck)
        setExportCode(deck.code)
        setIsShowingFront(true)
    }

    const handleDeleteIconClick = () => {
        setShowPopup(true)
        setDeckToDelete(hoveredDeck)
    }

    const handleDelete = async () => {
        setShowPopup(false)
        console.log(deckToDelete)
        try {
            await api.delete(`/api/deck/delete/${deckToDelete.id}/`)

        } catch (error) {
            console.error('Error details:', error.response ? error.response.data : error.message);
        }

        setCurrentCard(null)
        setCurrentDeck(null)
        setRefreshDecks(prev => !prev)
    }

    const handleCancel = () => {
        setShowPopup(false)
    }

    const renderList = deckList.map((deck, index) => {
        return (
            <li
                key={index}
                onClick={() => handleSelectDeck(deck)}
                onMouseEnter={() => setHoveredDeck(deck)}
                onMouseLeave={() => setHoveredDeck(null)}
            >
                <div className="trashbin">
                    <IoTrashOutline onClick={handleDeleteIconClick} style={{cursor: 'pointer'}} />
                </div>
                {currentDeck && currentDeck.name === deck.name ? (
                    <span style={{color: '#ffffff', backgroundColor: '#2e2e2e'}}>
                        {deck.name}
                    </span>
                ) : (
                    <span style={{color:'#2e2e2e', backgroundColor:'transparent'}}>
                        {deck.name}
                    </span>
                )}

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
                    <p>Are you sure you want to delete deck: '{currentDeck.name}' ?</p>
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