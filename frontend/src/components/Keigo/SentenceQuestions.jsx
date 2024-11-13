import { useState } from "react"
import "./SentenceQuestions.css"

function SentenceQuestions({onCleared}) {
    const questions = [
        { id: 1, sentence: "私はアメリカから来た", normal: "来た", formal: "参りました" },
        { id: 2, sentence: "<名前>と言う", normal: "言う", formal: "申します" },
    ]

    const [ currentQuestion, setCurrentQuestion ] = useState(0)
    const [ feedback, setFeedback ] = useState(questions[currentQuestion].sentence)
    const [ userInput, setUserInput ] = useState("")

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            if (userInput === questions[currentQuestion].formal) {
                setFeedback("Correct!")
                setTimeout(() => {
                    setFeedback(questions[currentQuestion + 1].sentence)
                    setCurrentQuestion((prev) => prev + 1)
                },1000)
            }
        }
    }

    return (
        <div className="question-container">
            <div className="fake-image"/>

            <div className="feedback">
                {feedback.replace(questions[currentQuestion].normal, "")}
                <span className="underline">
                    {questions[currentQuestion].normal}
                </span>
            </div>

            <input
                className="user-input"
                value={userInput}
                onChange={(event) => setUserInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Answer here"
            />

        </div>
    )
}

export default SentenceQuestions