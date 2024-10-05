import { useState, useEffect } from 'react'
import api from '../Api'
import { Navbar } from '../components/Navbar/Navbar'
import { DisplayFlashcard } from '../components/DisplayFlashcard/DisplayFlashcard'
import { CreateFlashcard } from '../components/CreateFlashCard/CreateFlashCard'
import { Button } from '../components/Button/Button'
import DeckList from '../components/DeckList/DeckList'
import "./Flashcard.css"

export const Flashcard = () => {

  const [ isCreatingFlashcard, setIsCreatingFlashcard ] = useState(false)
  const [ isEditingFlashcard, setIsEditingFlashcard ] = useState(false)
  const [ deckList, setDeckList ] = useState([])
  const [ currentDeck, setCurrentDeck ] = useState("")
  const [ cardList, setCardList ] = useState([])
  const [ isShowingFront, setIsShowingFront ] = useState(true)
  const [ refreshDecks, setRefreshDecks ] = useState(false)
  const [ currentCard, setCurrentCard ] = useState(null)
  const [ clearedCards, setClearedCards ] = useState([])
  const [ refreshPage, setRefreshPage ] = useState(false)

  useEffect(() => {
      const fetchDecks = async () => {
          const response = await api.get("api/flashcards/decks/")
          setDeckList(response.data) // get a list from api of unique decks

          if (response.data.length > 0) {
              setCurrentDeck(response.data[0]); // set the first deck as the current deck
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
      setClearedCards([])
  }, [currentDeck])

  const handleAddCardClick = () => {
    setIsCreatingFlashcard(true)
  }

  const handleEditCardClick = () => {
    if (currentCard !== null) {
      setIsEditingFlashcard(true)
    }
}

  const handleCancelClick = () => {
    setIsCreatingFlashcard(false)
    setIsEditingFlashcard(false)
  }

  const handleCreateClick = (new_card) => {
    setRefreshDecks((prev => !prev))
    setCardList((cardList) => [
      [...cardList, new_card]
    ])
    setIsCreatingFlashcard(false)
    setCurrentCard(new_card)
  }

  const handleEditClick = (edited_card) => {
    setRefreshDecks((prev => !prev))
    setIsCreatingFlashcard(false)
    setCurrentCard(edited_card)
    setIsEditingFlashcard(false)
    console.log("current deck: ",currentDeck)
    console.log("cardlist: ", cardList)
  }

  const handleDeckSelect = (deck) => {
    setCurrentDeck(deck);
    setIsShowingFront(true)
  }

  const handleClickOnCard = () => {
    setIsShowingFront((prev) => !prev)
    console.log(currentCard)
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
  }

  const handleResetDeckClick = () => {
    setCardList(clearedCards)
    setCurrentCard(clearedCards[Math.floor(Math.random() * clearedCards.length)])
    setRefreshPage(prev => !prev)
  }

  return (
    <div className='container'>
      <Navbar />
        {isCreatingFlashcard || isEditingFlashcard ?
          (
            <div className='create-content'>
              <CreateFlashcard
              deckList={deckList}
              currentDeck={currentDeck}
              currentCardId={currentCard ? currentCard["id"] : null}
              currentCardFront={isEditingFlashcard ? currentCard["front"] : ""}
              currentCardBack={isEditingFlashcard ? currentCard["back"] : ""}
              onSubmit={isCreatingFlashcard ? handleCreateClick : handleEditClick}
              onCancel={handleCancelClick}
              titleText={isCreatingFlashcard ? "New" : "Edit"}
              btnText={isCreatingFlashcard ? "Create" : "Edit"}
              />
            </div>
          ) : (
            <div className="content">
            <div className='left-side'>
              <div className='deck-list'>
                <DeckList onClick={handleDeckSelect} onDelete={setRefreshDecks} decks={deckList} currentDeck={currentDeck} />
              </div>
              <div className='left-btn-box'>
              <Button onClick={handleAddCardClick}>New Card</Button>
              <Button onClick={handleEditCardClick}>Edit Card</Button>
              <Button onClick={handleAddCardClick}>Export Deck</Button>
              </div>
            </div>
            <div className='right-side'>
            {cardList.length > 0 ?
              (
                <>
                {currentCard ? (
                  <>
                    <div className='card-box' onClick={handleClickOnCard}>
                        <DisplayFlashcard
                          id={currentCard["id"]}
                          deck={currentDeck}
                          text={isShowingFront ? currentCard["front"] : currentCard["back"]}
                          date={currentCard.date_created}
                          onDelete={setRefreshDecks}
                        />
                    </div>
                    <div className='right-btn-box'>
                      <Button onClick={handleNextClick}>Next</Button>
                    </div>
                  </>
              ) : (
                  <div>No cards available</div>
                )}
                </>
              ) : (
                <>
                {deckList.length >= 0 ? (
                  <div className='reset-btn'>
                    <Button onClick={handleResetDeckClick}>Reset</Button>
                  </div>
                ) : (
                  <p>Create new cards, and start practicing!</p>
                )}
                </>
              )}
              </div>
            </div>
          )}
    </div>
  )
}
