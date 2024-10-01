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

        console.log(`Creating: ${frontText}, ${backText}, ${selectedDeck}`)
        try {
                const response = await api.post(`/api/flashcards/`, {
                    front: frontText,
                    back: backText,
                    deck: selectedDeck,
                });

                console.log(response)
        } catch (error) {
            console.log(error)
            console.error('Error details:', error.response ? error.response.data : error.message);
        }

        onCreate()
    }

    return (
        <div className='container'>
            <div className='card-form'>
                <div className='title'>
                    <h2>New Flashcard:</h2>
                </div>
                <div className='card-inputs'>
                    <div className='front-text'>
                        Frontside
                    </div>
                    <input 
                        className='front-back-text'
                        type='text'
                        value={frontText} 
                        onChange={(e) => setFrontText(e.target.value)} 
                        required
                    />
                    <div className='back-text'>
                        Backside
                    </div>
                    <input 
                        className='front-back-text' 
                        type='text' 
                        value={backText} 
                        onChange={(e) => setBackText(e.target.value)} 
                        required
                    />
                </div>
                <div className='deck-text'>
                    New deck:
                </div>
                <div className='deck-picker'>
                    <select className='dropdown' value={dropdownTitle} onChange={handleDropdownChange}>
                        <option value="" disabled>Select a deck</option>
                        {deckList.map((deck, index) => (
                                <option key={index} value={deck}>
                                    {deck}
                                </option>)
                            )}
                    </select>
                    <input 
                        className='deck-input' 
                        type='text'
                        value={newDeckInput} 
                        onChange={handleDeckInput} 
                    />
                </div>
                <div className='buttons'>
                    <Button onClick={handleCreate} text="Create" />
                    <Button onClick={onCancel} text="Cancel" />
                </div>
            </div> 
        </div>
    );
}
