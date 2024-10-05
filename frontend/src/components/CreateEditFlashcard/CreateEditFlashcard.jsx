import {useEffect, useState, useContext } from 'react'
import { FlashcardContext } from '../../contexts/FlashcardContext'
import api from '../../Api'
import './CreateEditFlashcard.css'
import { Button } from '../Button/Button'



export const CreateEditFlashcard = ({ onSubmit })=> {

    const {
        isEditingFlashcard,
        deckList,
        currentDeck,
        currentCard,
        setIsCreatingFlashcard,
        setIsEditingFlashcard,
    } = useContext(FlashcardContext)

    const [ frontText, setFrontText ] = useState("")
    const [ backText, setBackText ] = useState("")
    const [ newDeckInput, setNewDeckInput ] = useState("")
    const [ selectedDeck, setSelectedDeck ] = useState("")
    const [ dropdownTitle, setDropdownTitle] = useState("")

    useEffect(() => {
        if (isEditingFlashcard) {
            setFrontText(currentCard["front"])
            setBackText(currentCard["back"])
        }
    }, [])

    const handleDropdownChange = (event) => {
        const selection = event.target.value
        setSelectedDeck(selection)
        setNewDeckInput("")
        setDropdownTitle(selection)
        console.log(selection)
    }

    const handleDeckInput = (event) => {
        const input_text = event.target.value
        setNewDeckInput(input_text)
        setSelectedDeck(input_text)
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        let createdCard = null

        console.log(`Creating: ${frontText}, ${backText}, ${selectedDeck}`)
        try {
                const response = await api.post(`/api/flashcards/`, {
                    front: frontText,
                    back: backText,
                    deck: selectedDeck ? selectedDeck : currentDeck,
                });

                createdCard = response.data

        } catch (error) {
            console.log(error)
            console.error('Error details:', error.response ? error.response.data : error.message);
        }

        onSubmit(createdCard)

    }

    const handleEdit = async (e) => {
        e.preventDefault()

        let editedCard = currentCard

        editedCard["front"] = frontText
        editedCard["back"] = backText

        try {
            const response = await api.put(`/api/flashcards/edit/${currentDeck}/${currentCard["id"]}/`, editedCard)

            console.log(response.data)

        } catch (error) {
            console.error('Error details:', error.response ? error.response.data : error.message);
        }

        setIsEditingFlashcard(false)
    }

    const handleCancelClick = () => {
        setIsCreatingFlashcard(false)
        setIsEditingFlashcard(false)
    }

    return (
            <div className='card'>
                <div className='title'>
                    <h2>{isEditingFlashcard ? "Edit" : "New"} Flashcard:</h2>
                </div>
                <div className='card-inputs'>
                    <div>
                        Frontside:
                    </div>
                    <input
                        className='text-input'
                        type='text'
                        value={frontText}
                        onChange={(e) => setFrontText(e.target.value)}
                        required
                    />
                    <div>
                        Backside:
                    </div>
                    <input
                        className='text-input'
                        type='text'
                        value={backText}
                        onChange={(e) => setBackText(e.target.value)}
                        required
                    />
                </div>
                {isEditingFlashcard ? (
                    <div className='deck-input'>Deck: {currentDeck}</div>
                ) : (
                <div className='deck-input'>
                    <select className='dropdown' value={dropdownTitle} onChange={handleDropdownChange}>
                        <option value="" disabled>{selectedDeck ? selectedDeck : currentDeck}</option>
                        {deckList.map((deck, index) => (
                                <option key={index} value={deck}>
                                    {deck}
                                </option>)
                            )}
                    </select>
                    <input
                        className='new-deck-input'
                        type='text'
                        placeholder='New deck'
                        value={newDeckInput}
                        onChange={handleDeckInput}
                    />
                </div>
                        )}
                <div className='buttons'>
                    <Button onClick={isEditingFlashcard ? handleEdit : handleCreate}>
                        {isEditingFlashcard ? "Edit" : "Create"}
                    </Button>
                    <Button onClick={handleCancelClick}>Cancel</Button>
                </div>
            </div>
    );
}
