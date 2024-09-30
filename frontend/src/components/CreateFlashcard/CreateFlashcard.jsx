import React, {useState, useEffect } from 'react'
import './CreateFlashCard.css'
import { Button } from '../Button/Button'



export const CreateFlashcard = ({ onCancel }) => {
    const [ selectedDeck, setSelectedDeck ] = useState([])

    let decks = ["deck1", "deck2", "deck3"]

    const handleDropdownChange = (event) => {
        setSelectedDeck(event.target.value)
        console.log(selectedDeck)
    }

    const handleCreate = () => {
        console.log("create")
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
                    <input className='front-back-text' type='text' required />

                    <div className='back-text'>
                        Backside
                    </div>
                    <input className='front-back-text' type='text' required />
                </div>
                <div className='deck-text'>
                    New deck:
                </div>
                <div className='deck-picker'>
                    <select className='dropdown' value={decks} onChange={handleDropdownChange}>
                        <option value="" disabled>Select a deck</option>
                        {decks.map((deck, index) => (
                            <option key={index} value={deck}>
                                {deck}
                            </option>
                        ))}
                    </select>
                    <input className='deck-input' type='text' />
                </div>
                <div className='buttons'>
                    <Button onClick={handleCreate} text="Create" />
                    <Button onClick={onCancel} text="Cancel" />
                    {/* <button className='button-30'>Create</button>
                    <button className="button-30" onClick={onCancel}>Cancel</button> */}
                </div>
            </div> 
        </div>
    );
}
