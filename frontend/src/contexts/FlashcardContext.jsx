import { createContext, useState, useEffect } from 'react';
import api from '../Api';

export const FlashcardContext = createContext();

export const FlashcardProvider = ({ children }) => {
  const [isCreatingFlashcard, setIsCreatingFlashcard] = useState(false);
  const [isEditingFlashcard, setIsEditingFlashcard] = useState(false);
  const [deckList, setDeckList] = useState([]);
  const [currentDeck, setCurrentDeck] = useState("");
  const [cardList, setCardList] = useState([]);
  const [isShowingFront, setIsShowingFront] = useState(true);
  const [currentCard, setCurrentCard] = useState(null);
  const [clearedCards, setClearedCards] = useState([]);
  const [refreshDecks, setRefreshDecks] = useState(false);

  useEffect(() => {
    const fetchDecks = async () => {
      const response = await api.get("api/flashcards/decks/");
      setDeckList(response.data);

      if (response.data.length > 0) {
        setCurrentDeck(response.data[0]);
      } else {
        setCurrentDeck('');
      }
    };

    fetchDecks();
  }, [refreshDecks]);

  useEffect(() => {
    const fetchCards = async () => {
      if (currentDeck.length > 0) {
        const response = await api.get(`api/flashcards/${currentDeck}`);
        setCardList(response.data);
        const randomIndex = Math.floor(Math.random() * response.data.length);
        setCurrentCard(response.data[randomIndex]);
      }
    };

    fetchCards();
    setClearedCards([]);
  }, [currentDeck]);

  const value = {
    isCreatingFlashcard,
    isEditingFlashcard,
    deckList,
    currentDeck,
    cardList,
    isShowingFront,
    currentCard,
    clearedCards,
    setIsCreatingFlashcard,
    setIsEditingFlashcard,
    setDeckList,
    setCurrentDeck,
    setCardList,
    setIsShowingFront,
    setCurrentCard,
    setClearedCards,
    setRefreshDecks,
  };

  return (
    <FlashcardContext.Provider value={value}>
      {children}
    </FlashcardContext.Provider>
  );
};
