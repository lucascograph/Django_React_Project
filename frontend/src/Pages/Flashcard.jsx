import React, { useState } from 'react'
import { Navbar } from '../components/Navbar/Navbar'
import { DisplayFlashcard } from '../components/DisplayFlashcard/DisplayFlashcard'
import { CreateFlashcard } from '../components/CreateFlashCard/CreateFlashCard'
import "./Flashcard.css"

export const Flashcard = () => {

  const [isCreatingFlashcard, setIsCreatingFlashcard] = useState(false)
  const handleCreateCardClick = () => {
    setIsCreatingFlashcard(true)
  }

  const handleCancelClick = () => {
    setIsCreatingFlashcard(false)
  }

  return (
    <div>
      <Navbar />
      {isCreatingFlashcard ? 
      (<CreateFlashcard onCancel={handleCancelClick}/>) : (
        <div className='container-body'>
          <div className='middle-body'>
            <div className='button-row'>
              <button className='button-30' id='select-btn' onClick={handleCreateCardClick}>
                Select Deck
              </button>
              <button className='button-30' id='create-btn' onClick={handleCreateCardClick}>
                Add card
              </button>
              <button className='button-30' id='share-btn' onClick={handleCreateCardClick}>
                Share/Import deck
              </button>
            </div>
            <DisplayFlashcard />
          </div>
        </div>)}
    </div>
  )
}
