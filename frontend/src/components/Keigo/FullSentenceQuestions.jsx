import { useState } from "react"
import "./FullSentenceQuestions.css"
import image_1 from "../../images/phonecall_1.jpg"
import image_3 from "../../images/phonecall_3.jpg"

function FullSentenceQuestions({ onCleared }) {
    const questions = [
        { id: 1, sentence: "ABC株式会社の田中と申します", check: /^(?:.+株式会社の|株式会社.+の).+?と申します$/, english: "Introduce yourself (with a company name):", image: image_1 },
        { id: 2, sentence: "木村様がいらっしゃいますか", check: /^.+?(?:様|さま|サマ)がいらっしゃいますか$/, english: "Ask to speak with someone:", image: image_3 },
        { id: 3, sentence: "後ほどかけ直します", check: /^(?:後程|後ほど|のちほど)(?:かけ直します|かけなおします|掛け直します|掛けなおします)$/, english: "You will call back later:", image: image_3 },
    ]

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [feedback, setFeedback] = useState(questions[currentQuestion].english)
    const [isCorrect, setIsCorrect] = useState(false)
    const [hideInputField, setHideInputField] = useState(false)
    const [userInput, setUserInput] = useState("")
    const [clearedSentences, setClearedsentences] = useState([])

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {

            if (questions[currentQuestion].check.test(userInput.toLowerCase())){
                const clearedSentence = questions[currentQuestion]
                setIsCorrect(true)
                setFeedback("Correct!")
                setHideInputField(true)
                setUserInput("")
                setTimeout(() => {
                    if (clearedSentences.length + 1 >= questions.length){
                        onCleared()
                    } else {
                        setClearedsentences([...clearedSentences, clearedSentence])
                        setIsCorrect(false)
                        setFeedback(questions[currentQuestion + 1].english)
                        setCurrentQuestion(prev => prev + 1)
                        setHideInputField(false)

                    }
                }, 1500)
            } else {
                setIsCorrect(false)
                setFeedback("Try again!")
                setHideInputField(true)
                setTimeout(() => {
                    setFeedback(questions[currentQuestion].english)
                    setHideInputField(false)
                    setUserInput("")
                }, 1500)
            }

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
                    {feedback}
                </div>
                <input
                    className="sentence-input"
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

export default FullSentenceQuestions
