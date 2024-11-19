import { useState } from "react"
import "./SentenceQuestions.css"
import image_1 from "../../images/phonecall_1.jpg"
import image_3 from "../../images/phonecall_3.jpg"

function SentenceQuestions({ onCleared }) {
    const questions = [
        { id: 1, sentence: "ABC株式会社の田中と言います", normal: ["言います"], formal: [["申します", "もうします", "モウシマス", "moushimasu"]], image: image_1 },
        { id: 2, sentence: "木村さんがいますか", normal: ["さん", "います"], formal: [["様", "さま", "sama"], ["いらっしゃいます", "イラッシャイマス", "irasshaimasu"]], image: image_3 },
    ]

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [feedback, setFeedback] = useState(questions[currentQuestion].sentence)
    const [isCorrect, setIsCorrect] = useState(false)
    const [hideInputField, setHideInputField] = useState(false)
    const [userInput, setUserInput] = useState("")
    const [clearedWords, setClearedWords] = useState([])

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            const currentQuestionData = questions[currentQuestion]
            const targetIndex = currentQuestionData.normal.findIndex(word => !clearedWords.includes(word))
            const correctAnswers = currentQuestionData.formal[targetIndex]
            const currentNormalWord = currentQuestionData.normal[targetIndex]

            if (correctAnswers.includes(userInput.toLowerCase())) {
                setIsCorrect(true)
                setClearedWords([...clearedWords, currentNormalWord])
                setUserInput("")
                questions[currentQuestion].sentence = questions[currentQuestion].sentence.replace

                if (clearedWords.length + 1 >= currentQuestionData.normal.length) {
                    if (currentQuestion < questions.length - 1) {
                        setFeedback("Correct!")
                        setHideInputField(true)
                        setTimeout(() => {
                            setIsCorrect(false)
                            setHideInputField(false)
                            setClearedWords([])
                            setFeedback(questions[currentQuestion + 1].sentence)
                            setCurrentQuestion((prev) => prev + 1)
                        }, 1500)
                    } else {
                        onCleared()
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
            <img src={questions[currentQuestion].image} alt="topic-image" />
        </div>
        Change to formal:
        {!hideInputField ? (
            <>
                <div className="feedback">
                    {
                        questions[currentQuestion].sentence
                            .split(new RegExp(`(${questions[currentQuestion].normal.join("|")})`))
                            .map((part, index) => {
                                const targetIndex = questions[currentQuestion].normal.indexOf(part)
                                if (clearedWords.includes(part) && targetIndex !== -1) {
                                    const formalWord = questions[currentQuestion].formal[targetIndex][0]
                                    return (
                                        <span key={index} className="text-green-500">{formalWord}</span>
                                    );
                                } else if (part === questions[currentQuestion].normal.find(word => !clearedWords.includes(word))) {
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
