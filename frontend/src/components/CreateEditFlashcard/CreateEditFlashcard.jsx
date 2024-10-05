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
        console.log("set new selected deck:", selection)
    }

    const handleDeckInput = (event) => {
        const input_text = event.target.value
        setNewDeckInput(input_text)
        setSelectedDeck(input_text)
        console.log("new selected deck: ", input_text)
        console.log("dropdown: ", input_text)
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        let createdCard = null
        let createdDeck = null

        if (!deckList.some((deck) => deck.name === selectedDeck)){
            try {
                const response = await api.post(`/api/deck/create/`, {
                    "name": selectedDeck
                })

                createdDeck = response.data
                console.log(createdDeck)
                console.log(`Successfully created new deck: ' ${createdDeck.name} '`)

            } catch(error) {
                console.log(error)
                console.error('Error details:', error.response ? error.response.data : error.message);
            }
        }


        const deck = createdDeck ? createdDeck : deckList.find((deck) => deck.name === selectedDeck)

        console.log(`Creating: ${frontText}, ${backText}, to deck: ' ${deck.name} '`)

        try {
                const response = await api.post(`/api/flashcard/create/`, {
                    front: frontText,
                    back: backText,
                    deck: deck.id
                });

                createdCard = response.data

        } catch (error) {
            console.log(error)
            console.error('Error details:', error.response ? error.response.data : error.message);
        }

        onSubmit(createdCard, deck)

    }

    const handleEdit = async (e) => {
        e.preventDefault()

        let editedCard = currentCard

        editedCard["front"] = frontText
        editedCard["back"] = backText

        try {
            const response = await api.put(`/api/flashcard/edit/${currentCard.id}/`, editedCard)

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
                    <div className='deck-input'>Deck: {currentDeck.name}</div>
                ) : (
                <div className='deck-input'>
                    <select className='dropdown' value={selectedDeck} onChange={handleDropdownChange}>
                        <option value="" disabled>{selectedDeck || "Select deck"}</option>
                        {deckList.map((deck, index) => (
                                <option key={index} value={deck.name}>
                                    {deck.name}
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
