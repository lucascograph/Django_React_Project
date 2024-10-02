import "./DeckList.css"
function DeckList({ onClick, decks, currentDeck }) {

    const renderList = decks.map((deck, index) => {
        return (
            <li key={index} onClick={() => onClick(deck)}
             style={{ backgroundColor: currentDeck === deck ? '#2e2e2e' : 'transparent'}}>
                <span style={{color : currentDeck === deck ? '#ffffff' : '#2e2e2e'}}>    
                    {deck}
                </span>
            </li>
        )
    })

    return (
        <div className="box">
            <h2>
                Decks
            </h2>
            <ul>
                {renderList} 
            </ul>
        </div>
    )
}

export default DeckList;