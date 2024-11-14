import { useState } from "react"
import "./SentenceQuestions.css"

function SentenceQuestions({onCleared}) {
    const questions = [
        { id: 1, sentence: "私はアメリカから来た", normal: "来た", formal: "参りました" },
        { id: 2, sentence: "ABC株式会社の田中と言う", normal: "言う", formal: "申します" },
    ]

    const [ currentQuestion, setCurrentQuestion ] = useState(0)
    const [ feedback, setFeedback ] = useState(questions[currentQuestion].sentence)
    const [ isCorrect, setIsCorrect ] = useState(false)
    const [ hideInputField, setHideInputField ] = useState(false)
    const [ userInput, setUserInput ] = useState("")

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            const correctAnswer = questions[currentQuestion].formal

            if (userInput === correctAnswer) {
                setIsCorrect(true)
                if (currentQuestion < (questions.length - 1)){
                    setFeedback("Correct!")
                    setHideInputField(true)
                    setUserInput("")
                    setTimeout(() => {
                        setIsCorrect(false)
                        setHideInputField(false)
                        setFeedback(questions[currentQuestion + 1].sentence)
                        setCurrentQuestion((prev) => prev + 1)
                    },1500)
                } else {
                    onCleared()
                }
            } else {
                setFeedback("Try again!")
                setHideInputField(true)
                setTimeout(() => {
                    setFeedback(questions[currentQuestion].sentence)
                    setHideInputField(false)
                    setUserInput("")
                }, 1500)
            }
        }
    }

    return (
        <div className="question-container">
            <div className="fake-image"/>
            Change to formal:
            {!hideInputField ? (
                <>
                <div className="feedback">
                    {feedback.replace(questions[currentQuestion].normal, "")}
                    <span className="underline text-red-500">
                        {questions[currentQuestion].normal}
                    </span>
                    。
                </div>

                <input
                    className="user-input"
                    value={userInput}
                    onChange={(event) => setUserInput(event.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Answer here"
                />
                </>
            ) : (<div className="feedback">{isCorrect ? <span className="correct">{feedback}</span> : <span className="incorrect">{feedback}</span>}</div>)}
        </div>
    )
}

export default SentenceQuestions