import {useEffect, useState } from 'react'
import api from '../../Api'
import './CreateFlashCard.css'
import { Button } from '../Button/Button'



export const CreateFlashcard = ({ deckList, currentDeck, currentCardId, currentCardFront, currentCardBack, onSubmit, onCancel, titleText}) => {
    const [ frontText, setFrontText ] = useState("")
    const [ backText, setBackText ] = useState("")
    const [ newDeckInput, setNewDeckInput ] = useState("")
    const [ selectedDeck, setSelectedDeck ] = useState("")
    const [ dropdownTitle, setDropdownTitle] = useState("")

    useEffect(() => {
        setFrontText(currentCardFront)
        setBackText(currentCardBack)
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
        setDropdownTitle("")
        console.log(input_text)
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        let new_card = null

        console.log(`Creating: ${frontText}, ${backText}, ${selectedDeck}`)
        try {
                const response = await api.post(`/api/flashcards/`, {
                    front: frontText,
                    back: backText,
                    deck: selectedDeck,
                });
                new_card = response.data
                console.log(response)
        } catch (error) {
            console.log(error)
            console.error('Error details:', error.response ? error.response.data : error.message);
        }

        onSubmit(new_card)
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        let edited_card = null
        try {
            const response = await api.put(`/api/flashcards/edit/${currentDeck}/${currentCardId}/`, {
                front: frontText,
                back: backText,
                deck: currentDeck
            })

            edited_card = response.data
        } catch (error) {
            console.error('Error details:', error.response ? error.response.data : error.message);
        }

        onSubmit(edited_card)
    }

    return (
            <div className='card'>
                <div className='title'>
                    <h2>{titleText} Flashcard:</h2>
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
                {titleText === "Edit" ? (
                    <div className='deck-input'>Deck: {currentDeck}</div>
                ) : (
                <div className='deck-input'>
                    <select className='dropdown' value={dropdownTitle} onChange={handleDropdownChange}>
                        <option value="" disabled>Select a deck</option>
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
                    <Button onClick={titleText === "Edit" ? handleEdit : handleCreate}>{titleText === "Edit" ? "Edit" : "Create"}</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </div>
            </div>
    );
}
