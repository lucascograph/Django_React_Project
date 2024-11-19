import { useState } from "react"
import "./SentenceQuestions.css"
import image_1 from "../../images/phonecall_1.jpg"
import image_3 from "../../images/phonecall_3.jpg"

function SentenceQuestions({ onCleared }) {
    const questions = [
        { id: 1, sentence: "ABC株式会社の田中と申します", image: image_1 },
        { id: 2, sentence: "木村さんがいらっしゃいますか", image: image_3 },
    ]

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [feedback, setFeedback] = useState(questions[currentQuestion].sentence)
    const [isCorrect, setIsCorrect] = useState(false)
    const [hideInputField, setHideInputField] = useState(false)
    const [userInput, setUserInput] = useState("")
    const [clearedWords, setClearedWords] = useState([])

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            console.log("corretct")
        }
    }

    return (
    <div className="question-container">
        <div className="image-container">
            <img src={questions[currentQuestion].image} alt="topic-image" />
        </div>
        {!hideInputField ? (
            <>
                <div className="feedback">

                </div>
                <input
                    className="user-input"
                    value={userInput}
                    onChange={(event) => setUserInput(event.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Answer here"
                />
            </>
        ) : (
            <div className="feedback">
                {isCorrect ? <span className="correct">{feedback}</span> : <span className="incorrect">{feedback}</span>}
            </div>
        )}
    </div>
);

}

export default SentenceQuestions
