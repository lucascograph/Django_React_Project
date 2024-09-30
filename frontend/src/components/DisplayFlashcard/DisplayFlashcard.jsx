import "./DisplayFlashcard.css";

const text = "hello"

export const DisplayFlashcard = () => {
    return (
        <div className="container">
            <div className="card">
                <div className="card-info">
                    <div className="deck">Deck: Idoms</div>
                    <div className="created">Created: 2024-09-30</div>
                </div>
                <div className="text-box">
                    <div className="text">
                        <a>
                            {text} 
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
