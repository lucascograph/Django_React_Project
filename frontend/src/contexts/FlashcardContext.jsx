import { createContext, useState, useEffect } from 'react'
import api from '../Api'
import dayjs from 'dayjs'

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
    const [ userProgressId, setUserProgressId ] = useState(null)


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

  const ensureTodayProgress = async () => {
    try {
      const response = await api.get("api/progress/today/")
      setUserProgressId(response.data.id)
      return response.data.id
    } catch (error) {
      console.error("Error creating or getting progress:", error)
    }
  }

  const addClearedFlashcard = async (flashcardId) => {
    try {
      const progressId = userProgressId || await ensureTodayProgress()

      const response = await api.post("api/progress/cleared/flashcard/", {
        progress_id: progressId,
        flashcardId: flashcardId,
      })

      return response.data
    } catch (error) {
      console.error("Error adding cleared flashcard:", error)
    }
  }

  const fetchClearedFlashcards = async () => {
    try {
      const today = dayjs().format("YYYY-MM-DD")
      const response = await api.get(`api/progress/cleared/flashcard/list/`, {date: today})

      const cardIds = response.data.map(item => item.flashcard)
      setClearedCards(cardIds)
      return cardIds
    } catch (error) {
      console.error("Error fetching cleared flashcards:", error)
    }
  }

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
    addClearedFlashcard,
    ensureTodayProgress,
    fetchClearedFlashcards,
  }

  return (
    <FlashcardContext.Provider value={value}>
      {children}
    </FlashcardContext.Provider>
  )
}
