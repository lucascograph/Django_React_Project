import React, {useState, useEffect } from 'react'
import api from '../../Api'
import './CreateFlashCard.css'
import { Button } from '../Button/Button'



export const CreateFlashcard = ({ deckList, onCreate, onCancel }) => {
    const [ frontText, setFrontText ] = useState("")
    const [ backText, setBackText ] = useState("")
    const [ newDeckInput, setNewDeckInput ] = useState("")
    const [ selectedDeck, setSelectedDeck ] = useState("")
    const [ dropdownTitle, setDropdownTitle] = useState("")

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

        onCreate(new_card)
    }

    return (
            <div className='card-form'>
                <div className='title'>
                    <h2>New Flashcard:</h2>
                </div>
                <div className='card-inputs'>
                    Frontside:
                    <input
                        className='text-input'
                        type='text'
                        value={frontText}
                        onChange={(e) => setFrontText(e.target.value)}
                        required
                    />
                    Backside:
                    <input
                        className='text-input'
                        type='text'
                        value={backText}
                        onChange={(e) => setBackText(e.target.value)}
                        required
                    />
                </div>
                <div className='deck-input'>
                    <div className='new-deck-title'>
                        New deck:
                    </div>
                    <div className='dropdown-text-inputs'>
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
                            value={newDeckInput}
                            onChange={handleDeckInput}
                        />
                    </div>
                </div>
                <div className='buttons'>
                    <Button onClick={handleCreate} text="Create" size="medium" />
                    <Button onClick={onCancel} text="Cancel" size="small"/>
                </div>
            </div>
    );
}
