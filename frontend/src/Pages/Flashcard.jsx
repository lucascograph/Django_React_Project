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
  const [refreshDecks, setRefreshDecks] = useState(false);

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

    }, [refreshDecks])

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

  const handleAddCardClick = () => {
    setIsCreatingFlashcard(true)
  }

  const handleCancelClick = () => {
    setIsCreatingFlashcard(false)
  }

  const handleCreateClick = () => {
    setRefreshDecks((prev => !prev))
  }

  const handleDeckSelect = (deck) => {
    setCurrentDeck(deck);
  };


  const handleClickOnCard = () => {
    setIsShowingFront((prev) => !prev)
  }

  return (
    <div>
      <Navbar />
      {isCreatingFlashcard ? 
      (<CreateFlashcard deckList={deckList} onCreate={handleCreateClick} onCancel={handleCancelClick}/>) : (
        <div className='container-body'>
          <div className='middle-body'>
            <div className='button-row'>
              <button className='button-30' id='select-btn' onClick={handleAddCardClick}>
                Select Deck
              </button>
              <button className='button-30' id='create-btn' onClick={handleAddCardClick}>
                Add card
              </button>
              <button className='button-30' id='share-btn' onClick={handleAddCardClick}>
                Share/Import deck
              </button>
            </div>
            <div className='deck-list'>
              <h3>Select a Deck:</h3>
              <ul>
                {deckList.map((deck, index) => (
                  <li 
                    key={index} 
                    onClick={() => handleDeckSelect(deck)} 
                    style={{ cursor: 'pointer', padding: '5px', backgroundColor: currentDeck === deck ? '#e0e0e0' : 'transparent' }}
                  >
                    {deck}
                  </li>
                ))}
              </ul>
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
