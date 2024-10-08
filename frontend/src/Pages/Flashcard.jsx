import { useContext, useState } from 'react'
import { FlashcardContext } from '../contexts/FlashcardContext'
import { Navbar } from '../components/Navbar/Navbar'
import { DisplayFlashcard } from '../components/Flashcard/DisplayFlashcard/DisplayFlashcard'
import { CreateEditFlashcard } from '../components/Flashcard/CreateEditFlashcard/CreateEditFlashcard'
import { ExportImportDeck } from '../components/Flashcard/ExportImportDeck/ExportImportDeck'
import { Button } from '../components/Button/Button'
import DeckList from '../components/Flashcard/DeckList/DeckList'
import "./Flashcard.css"

export const Flashcard = () => {

  const {
    isCreatingFlashcard,
    isEditingFlashcard,
    deckList,
    cardList,
    currentCard,
    clearedCards,
    currentDeck,
    setIsCreatingFlashcard,
    setIsEditingFlashcard,
    setCardList,
    setIsShowingFront,
    setCurrentCard,
    setClearedCards,
  } = useContext(FlashcardContext);

  const [ showExportCode, setShowExportCode ] = useState(false)

  const handleAddCardClick = () => {
    setIsCreatingFlashcard(true)
  }

  const handleEditCardClick = () => {
    if (currentCard !== null) {
      setIsEditingFlashcard(true)
      console.log(currentCard)
    } else {
      console.log("No card to edit...")
    }
  }

  const handleExportImportClick = () => {
    setShowExportCode(prev => !prev)
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
    setClearedCards([])
    let randomIndex = (Math.floor(Math.random() * clearedCards.length))
    setCurrentCard(clearedCards[randomIndex])
  }

  return (
    <div className='container'>
      <Navbar />
      {showExportCode && (<ExportImportDeck onButtonClick={setShowExportCode}/>)}
        {isCreatingFlashcard || isEditingFlashcard ?
          (
            <div className='create-content'>
              <CreateEditFlashcard />
            </div>
          ) : (
            <div className="content">
            <div className='left-side'>
              <div className='deck-list'>
                <DeckList  />
              </div>
              <div className='left-btn-box'>
              <Button onClick={handleAddCardClick}>New Card</Button>
              <Button onClick={handleEditCardClick}>Edit Card</Button>
              <Button onClick={handleExportImportClick}>Export/import</Button>
              </div>
            </div>
            <div className='right-side'>
            {cardList.length > 0 ? (
                <>
                {currentCard ? (
                  <>
                    <div className='card-box'>
                        <DisplayFlashcard />
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
