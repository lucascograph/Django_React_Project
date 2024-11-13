import { useState } from 'react'
import "./vocabularyQuestions.css"
import Button from '../Button/Button'



function VocabularyQuestions({onCleared}) {

    const questions = [
        { id: 1, word: "(自分が）来る", options: ["伺う", "参る", "お目にかかる", "拝見する"], correct: "参る" },
        { id: 2, word: "（自分が）言う", options: ["ご覧になる", "申す", "伺う", "差し上げる"], correct: "申す" },
        { id: 3, word: "見る", options: ["ご覧になる", "拝見する", "伺う", "差し上げる"], correct: "拝見する" },
    ]


    const [ currentQuestion, setCurrentQuestion ] = useState(0)
    const [ feedback, setFeedback ] = useState(questions[currentQuestion].word)


    const handleAnswerClick = (option) => {
        const correctAnswer = questions[currentQuestion].correct

        if (option === correctAnswer) {
            setFeedback("Correct answer!")

            if (currentQuestion < (questions.length - 1)) {
                setTimeout(() => {
                    setFeedback(questions[currentQuestion + 1].word)
                    setCurrentQuestion((prev) => prev + 1)
                }, 1500)
            } else {
                setFeedback("Vocabulary section complete!")
                setTimeout(() => {
                    onCleared()
                }, 1500)
            }
        }
    }

    return (
        <div className="question-container">
            <div className="fake-image" />
            Vocabulary quiz:
            <div className="feedback">{feedback}</div>
            <div className="buttons">
                {questions[currentQuestion].options.map((option, index) => (
                    <Button standard key={index} onClick={() => handleAnswerClick(option)}>
                        {option}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default VocabularyQuestions