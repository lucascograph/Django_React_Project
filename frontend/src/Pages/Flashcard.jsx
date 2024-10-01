import React, { useState, useEffect } from 'react'
import api from '../Api'
import { Navbar } from '../components/Navbar/Navbar'
import { DisplayFlashcard } from '../components/DisplayFlashcard/DisplayFlashcard'
import { CreateFlashcard } from '../components/CreateFlashCard/CreateFlashCard'
import "./Flashcard.css"

export const Flashcard = () => {

  const [ isCreatingFlashcard, setIsCreatingFlashcard ] = useState(false)
  const [ deckList, setDeckList ] = useState([])
  const [ currentDeck, setCurrentDeck ] = useState("")
  const [ cardList, setCardList ] = useState([])
  const [ isShowingFront, setIsShowingFront ] = useState(true)

  useEffect(() => {
      const fetchDecks = async () => {
          const response = await api.get("api/flashcards/decks/")
          setDeckList(response.data) // get a list from api of unique decks

          if (response.data.length > 0) {
              setCurrentDeck(response.data[0]); // Set the first deck as the current deck
          } else {
              setCurrentDeck('');
          }
      }       

      fetchDecks()

    }, [])

  useEffect(() => {
      const fetchCards = async () => {
          if (currentDeck.length > 0) {
              const response = await api.get(`api/flashcards/${currentDeck}`)
              setCardList(response.data)
              console.log(response.data)
          }
      }

      fetchCards()
  }, [currentDeck])

  const handleCreateCardClick = () => {
    setIsCreatingFlashcard(true)
  }

  const handleCancelClick = () => {
    setIsCreatingFlashcard(false)
  }

  const handleClickOnCard = () => {
    setIsShowingFront((prev) => !prev)
  }

  return (
    <div>
      <Navbar />
      {isCreatingFlashcard ? 
      (<CreateFlashcard deckList={deckList} onCancel={handleCancelClick}/>) : (
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
            {cardList.length > 0 ? (
              <div className='card-box' onClick={handleClickOnCard}>
                <DisplayFlashcard 
                  deck={currentDeck} 
                  text={isShowingFront ? cardList[0].front : cardList[0].back} 
                  date={cardList[0].date_created}  
                />
              </div>
            ) : (
                <p>Create new cards</p>
            )}
          </div>
        </div>)}
    </div>
  )
}
