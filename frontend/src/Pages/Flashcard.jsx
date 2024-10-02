import React, { useState, useEffect } from 'react'
import api from '../Api'
import { Navbar } from '../components/Navbar/Navbar'
import { DisplayFlashcard } from '../components/DisplayFlashcard/DisplayFlashcard'
import { CreateFlashcard } from '../components/CreateFlashCard/CreateFlashCard'
import { Button } from '../components/Button/Button'
import DeckList from '../components/DeckList/DeckList'
import "./Flashcard.css"

export const Flashcard = () => {

  const [ isCreatingFlashcard, setIsCreatingFlashcard ] = useState(false)
  const [ deckList, setDeckList ] = useState([])
  const [ currentDeck, setCurrentDeck ] = useState("")
  const [ cardList, setCardList ] = useState([])
  const [ isShowingFront, setIsShowingFront ] = useState(true)
  const [refreshDecks, setRefreshDecks] = useState(false)
  const [ currentCard, setCurrentCard ] = useState(null)
  const [ clearedCards, setClearedCards ] = useState([])

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
              const randomIndex = Math.floor(Math.random() * response.data.length);
              setCurrentCard(response.data[randomIndex])
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
    setIsCreatingFlashcard(false)
  }

  const handleDeckSelect = (deck) => {
    setCurrentDeck(deck);
    setIsShowingFront(true)
  };


  const handleClickOnCard = () => {
    setIsShowingFront((prev) => !prev)
  }

  const handleNextClick = () => {
    
    setIsShowingFront(true)

    if (cardList.length > 1) {
      const remainingCards = cardList.filter((card) => card !== currentCard);
      setClearedCards([...clearedCards, currentCard]);
      
      const randomIndex = Math.floor(Math.random() * remainingCards.length);
      setCurrentCard(remainingCards[randomIndex]);
      
      setCardList(remainingCards);
    } else if (cardList.length === 1) {
      setClearedCards([...clearedCards, currentCard]);
      setCardList([]);
      setCurrentCard(null); 
  }
};

  return (
    <div className='container'>
      <Navbar />
        {isCreatingFlashcard ? 
          (
            <CreateFlashcard deckList={deckList} onCreate={handleCreateClick} onCancel={handleCancelClick}/>
          ) : (
            <div className="content">
            <div className='left-side'>
              <div className='deck-list'>
                <DeckList onClick={handleDeckSelect} decks={deckList} currentDeck={currentDeck} />
              </div>
              <Button onClick={handleAddCardClick} text="New Card" size="medium" />
              <Button onClick={handleAddCardClick} text="Export Deck" size="medium" />
            </div>
            <div className='right-side'>
            {cardList.length > 0 ?
              (
                <>
                <div className='card-box' onClick={handleClickOnCard}>
                    <DisplayFlashcard 
                      deck={currentDeck} 
                      text={isShowingFront ? currentCard["front"] : currentCard["back"]} 
                      date={currentCard.date_created} />
                </div>
                <div className='next-btn'>
                  <Button onClick={handleNextClick} text="Next" size="large" />
                </div>
                </>
              ) : (
                <p>Cleared all cards in current deck. Choose another deck!</p>
              )}
              </div>
            </div>
          )}
    </div>
  )
}
