import { useState } from "react"
import "./SentenceQuestions.css"

function SentenceQuestions({ onCleared, keigoData, images }) {

    const questions = keigoData

    const questionsWithImages = questions.map((q, i) => ({
        ...q,
        image: images[i]
    }));

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [feedback, setFeedback] = useState(questionsWithImages[currentQuestion].sentence)
    const [isCorrect, setIsCorrect] = useState(false)
    const [hideInputField, setHideInputField] = useState(false)
    const [userInput, setUserInput] = useState("")
    const [clearedWords, setClearedWords] = useState([])

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            const currentQuestionData = questionsWithImages[currentQuestion]
            const targetIndex = currentQuestionData.normal.findIndex(word => !clearedWords.includes(word))
            const correctAnswers = currentQuestionData.formal[targetIndex]
            const currentNormalWord = currentQuestionData.normal[targetIndex]

            if (correctAnswers.includes(userInput.toLowerCase())) {
                setIsCorrect(true)
                setClearedWords([...clearedWords, currentNormalWord])
                setUserInput("")

                if (clearedWords.length + 1 >= currentQuestionData.normal.length) {
                    if (currentQuestion < questionsWithImages.length - 1) {
                        setFeedback("Correct!")
                        setHideInputField(true)
                        setTimeout(() => {
                            setIsCorrect(false)
                            setHideInputField(false)
                            setClearedWords([])
                            setFeedback(questionsWithImages[currentQuestion + 1].sentence)
                            setCurrentQuestion((prev) => prev + 1)
                        }, 1500)
                    } else {
                        setFeedback("2/4 Section(s) complete!")
                        setHideInputField(true)
                        setTimeout(() => {
                            setIsCorrect(false)
                            onCleared()
                        }, 1500)
                    }
                }
            } else {
                setIsCorrect(false)
                setFeedback("Try again!")
                setHideInputField(true)
                setTimeout(() => {
                    setFeedback(currentQuestionData.sentence)
                    setHideInputField(false)
                    setUserInput("")
                }, 1500)
            }
        }
    }

    return (
    <div className="question-container">
        <div className="image-container">
            <img src={questionsWithImages[currentQuestion].image} alt="topic-image" />
        </div>
        Change to formal:
        {!hideInputField ? (
            <>
                <div className="feedback">
                    {
                        questionsWithImages[currentQuestion].sentence
                            .split(new RegExp(`(${questionsWithImages[currentQuestion].normal.join("|")})`))
                            .map((part, index) => {
                                const targetIndex = questionsWithImages[currentQuestion].normal.indexOf(part)
                                if (clearedWords.includes(part) && targetIndex !== -1) {
                                    const formalWord = questionsWithImages[currentQuestion].formal[targetIndex][0]
                                    return (
                                        <span key={index} className="text-green-500">{formalWord}</span>
                                    );
                                } else if (part === questionsWithImages[currentQuestion].normal.find(word => !clearedWords.includes(word))) {
                                    return (
                                        <span key={index} className="underline text-red-500">{part}</span>
                                    );
                                }
                                return <span key={index}>{part}</span>
                            })
                    }
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
