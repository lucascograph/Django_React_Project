import "./DisplayFlashcard.css";


export const DisplayFlashcard = ({ deck, text, date }) => {
    return (
            <div className="card">
                <div className="card-info">
                    <div className="deck">Deck: {deck}</div>
                    <div className="created">Created: {date.split("T")[0]}</div> {/* date: 2024-01-01T04:27...... */}
                </div>
                <div className="text-box">
                    <div className="text">
                        <a>
                            {text} 
                        </a>
                    </div>
                </div>
            </div>
    );
}
