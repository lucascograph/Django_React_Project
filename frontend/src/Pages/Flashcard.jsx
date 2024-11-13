import { useContext, useState } from 'react'
import { FlashcardContext } from '../contexts/FlashcardContext'
import { Navbar } from '../components/Navbar/Navbar'
import { DisplayFlashcard } from '../components/Flashcard/DisplayFlashcard/DisplayFlashcard'
import { CreateEditFlashcard } from '../components/Flashcard/CreateEditFlashcard/CreateEditFlashcard'
import { ExportImportDeck } from '../components/Flashcard/ExportImportDeck/ExportImportDeck'
import Button from '../components/Button/Button'
import DeckList from '../components/Flashcard/DeckList/DeckList'
import "./Flashcard.css"

export const Flashcard = () => {

    const [ hardCards, setHardCards ] = useState([])

    const {
        isCreatingFlashcard,
        isEditingFlashcard,
        deckList,
        cardList,
        currentCard,
        currentDeck,
        clearedCards,
        setIsCreatingFlashcard,
        setIsEditingFlashcard,
        setCardList,
        setIsShowingFront,
        setCurrentCard,
        setClearedCards,
    } = useContext(FlashcardContext);

    const [ showExportCode, setShowExportCode ] = useState(false)
    const [ mousePosition, setMousePosition ] = useState({x: 0, y: 0})

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

    const handleExportImportClick = (event) => {
        setMousePosition({x: event.clientX, y: event.clientY})
        setShowExportCode(prev => !prev)
    }

    const handleHardClick = () => {

        setIsShowingFront(true)

        setClearedCards([...clearedCards, currentCard]);
        setHardCards([...hardCards, currentCard])

        if (cardList.length > 1) {
            const remainingCards = cardList.filter((card) => card !== currentCard);

            const randomIndex = Math.floor(Math.random() * remainingCards.length);
            setCurrentCard(remainingCards[randomIndex]);

            setCardList(remainingCards);
        } else if (cardList.length === 1) {
            setCardList([]);
            setCurrentCard(null);
        }
    }

    const handleEasyClick = () => {

        setIsShowingFront(true)

        setClearedCards([...clearedCards, currentCard]);

        if (cardList.length > 1) {
            const remainingCards = cardList.filter((card) => card !== currentCard);

            const randomIndex = Math.floor(Math.random() * remainingCards.length);
            setCurrentCard(remainingCards[randomIndex]);

            setCardList(remainingCards);
        } else if (cardList.length === 1) {
            setCardList([]);
            setCurrentCard(null);
        }
    }

    const handleResetDeckClick = () => {
        setCardList(hardCards)
        let randomIndex = (Math.floor(Math.random() * hardCards.length))
        setCurrentCard(hardCards[randomIndex])
        setClearedCards([])
        setHardCards([])

        console.log(hardCards)
        console.log(currentCard)
    }

    return (
        <div className='container'>
            <Navbar />
            {showExportCode && (
                <ExportImportDeck onButtonClick={setShowExportCode} position={[mousePosition?.x, mousePosition?.y]} />
            )}
            {isCreatingFlashcard || isEditingFlashcard ? (
                <div className='create-edit-content'>
                    <CreateEditFlashcard />
                </div>
            ) : (
                <div className='content'>
                    <div className='left-side'>
                    <DeckList className="deck-list" />
                        <div className='l-btn'>
                            <Button standard onClick={handleAddCardClick}>New Card</Button>
                            <Button standard onClick={handleEditCardClick}>Edit Card</Button>
                            <Button standard onClick={handleExportImportClick}>Export/import deck</Button>
                        </div>
                    </div>
                    {cardList.length > 0 ? (
                        currentCard ? (
                            <div className='right-side'>
                                <DisplayFlashcard />
                                <div className='r-btn'>
                                    <Button decline small onClick={handleHardClick}>Hard</Button>
                                    <Button accept large onClick={handleEasyClick}>Easy</Button>
                                </div>
                            </div>
                        ) : (
                            <div className='no-card-text'>No cards available</div>
                        )
                    ) : (
                        deckList.length > 0 ? (
                            hardCards.length > 0 ? (
                                <div className='reset'>
                                    <Button standard large onClick={handleResetDeckClick}>Reset</Button>
                                </div>
                            ) :(
                                <div className='no-card-text'>You cleared all cards in {currentDeck?.name}, well done!</div>
                            )
                        ) : (
                            <div className='no-card-text'>Create new cards, and start practicing!</div>
                        )
                    )}
                </div>
            )}
        </div>
    )
}
