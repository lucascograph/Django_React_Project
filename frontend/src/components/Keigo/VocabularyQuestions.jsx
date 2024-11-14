import { useEffect, useState } from 'react'
import "./VocabularyQuestions.css"
import Button from '../Button/Button'



function VocabularyQuestions({onCleared}) {

    const init_questions = [
        { id: 1, word: "Answering the phone:", options: ["ABC株式会社でございます。", "もしもし。", "お疲れ様です。", "いつもお世話になっております。"], correct: "ABC株式会社でございます。" },
        { id: 2, word: "Introducing yourself:", options: ["ABC株式会社の田中さんと申します。", "ABC株式会社の田中と申します。", "おはようございます、田中です。", "もしもし、お疲れ様です。"], correct: "ABC株式会社の田中と申します。" },
        { id: 3, word: "見る", options: ["ご覧になります", "拝見します", "伺います", "差し上げます"], correct: "拝見します" },
        { id: 4, word: "今", options: ["ただいま", "1", "2", "3"], correct: "ただいま"}
    ]


    const [ currentQuestion, setCurrentQuestion ] = useState(0)
    const [ questions, setShuffledQuestions] = useState(init_questions)
    const [ feedback, setFeedback ] = useState(questions[currentQuestion].word)
    const [ isCorrect, setIsCorrect ] = useState(false)
    const [ hideButtons, setHideButtons ] = useState(false)

    function shuffleOptions(array){
        let currentIndex = array.length

        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
        }

        return array
    }

    useEffect(() => {
        setShuffledQuestions(prevQuestions =>
            prevQuestions.map(q => ({
                ...q,
                options: shuffleOptions([...q.options])
            }))
        );
    }, []);

    const handleAnswerClick = (answer) => {
        const correctAnswer = questions[currentQuestion].correct

        if (answer === correctAnswer) {
            setFeedback("Correct answer!")
            setIsCorrect(true)
            setHideButtons(true)

            if (currentQuestion < (questions.length - 1)) {
                setTimeout(() => {
                    setFeedback(questions[currentQuestion + 1].word)
                    setCurrentQuestion((prev) => prev + 1)
                    setIsCorrect(false)
                    setHideButtons(false)
                }, 1500)
            } else {
                setFeedback("Vocabulary section complete!")
                setHideButtons(true)
                setTimeout(() => {
                    setIsCorrect(false)
                    setHideButtons(false)
                    onCleared()
                }, 1500)
            }
        } else {
            setFeedback("Try again!")
            setHideButtons(true)

            questions[currentQuestion].options = questions[currentQuestion].options.filter(option => option !== answer)

            setTimeout(() => {
                setFeedback(questions[currentQuestion].word)
                setHideButtons(false)
            }, 1500);
        }
    }

    return (
        <div className="question-container">
            <div className="fake-image" />
            Vocabulary quiz:
            {!hideButtons ? (
                <>
                <div className="feedback">{feedback}</div>
                <div className='options'>
                {questions[currentQuestion].options.map((option, index) => (
                    <Button className="option-buttons" key={index} onClick={() => handleAnswerClick(option)}>
                        {option}
                    </Button>
                ))}
                </div>
                </>
            ) : (
                <div className="feedback">{isCorrect ? <span className='correct'>{feedback}</span> : <span className='incorrect'>{feedback}</span>}</div>
            )}
        </div>
    )
}

export default VocabularyQuestions