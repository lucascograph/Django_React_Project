import { createContext, useState, useEffect } from 'react'
import api from '../Api'

export const FlashcardContext = createContext()

export const FlashcardProvider = ({ children }) => {
    const [ isCreatingFlashcard, setIsCreatingFlashcard ] = useState(false)
    const [ isEditingFlashcard, setIsEditingFlashcard ] = useState(false)
    const [ deckList, setDeckList ] = useState([])
    const [ currentDeck, setCurrentDeck ] = useState(null)
    const [ cardList, setCardList ] = useState([])
    const [ isShowingFront, setIsShowingFront ] = useState(true)
    const [ currentCard, setCurrentCard ] = useState(null)
    const [ clearedCards, setClearedCards ] = useState([])
    const [ refreshDecks, setRefreshDecks ] = useState(false)
    const [ exportCode, setExportCode ] = useState("")
    const [ lastCardStack, setLastCardStack ] = useState([])
    const [ hardCards, setHardCards ] = useState([])

    useEffect(() => {
        const fetchDecks = async () => {
            try {
                const response = await api.get("api/deck/list/")
                if (response.data.length >= 1) {

                    setDeckList(response.data)

                    if (!currentDeck) {
                        setCurrentDeck(response.data[0])
                    }

                    setExportCode(currentDeck ? currentDeck.code : response.data[0]["code"])

                } else {
                    setCurrentDeck(null)
                    setDeckList([])
                }
            } catch (error) {
                console.error("Error fetching decks:", error)
            }
        }

        fetchDecks()

    }, [refreshDecks])

    useEffect(() => {
        const fetchCards = async () => {
            try {
                if (currentDeck) {
                    const response = await api.get(`api/flashcard/list/${currentDeck.id}/`)
                    setCardList(response.data)
                    const randomIndex = Math.floor(Math.random() * response.data.length)
                    setCurrentCard(response.data[randomIndex])
                }
            } catch (error) {
                console.log(error)
            }
    }

    fetchCards()
    setClearedCards([])
  }, [currentDeck])

  const value = {
    isCreatingFlashcard,
    isEditingFlashcard,
    deckList,
    currentDeck,
    cardList,
    isShowingFront,
    currentCard,
    clearedCards,
    exportCode,
    lastCardStack,
    hardCards,
    setHardCards,
    setLastCardStack,
    setIsCreatingFlashcard,
    setIsEditingFlashcard,
    setDeckList,
    setCurrentDeck,
    setCardList,
    setIsShowingFront,
    setCurrentCard,
    setClearedCards,
    setRefreshDecks,
    setExportCode,
  }

  return (
    <FlashcardContext.Provider value={value}>
      {children}
    </FlashcardContext.Provider>
  )
}
