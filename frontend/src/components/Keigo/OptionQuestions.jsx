import { useEffect, useState } from 'react'
import "./OptionQuestions.css"
import Button from '../Button/Button'
import image_1 from "../../images/phonecall_1.jpg"
import image_2 from "../../images/phonecall_2.jpg"



function VocabularyQuestions({onCleared}) {

    const init_questions = [
        { id: 1, question: "First time introduction:", options: ["① ABC株式会社の田中さんと申します。", "① ABC株式会社の田中と申します。", "① おはようございます、田中です。", "① もしもし、お疲れ様です。"], correct: "① ABC株式会社の田中と申します。", image: image_1},
        { id: 2, question: "Asking for a person:", options: ["① こちらこそ / ② 木村様はいらっしゃいますか？", "① こちらこそ / ② 木村さんはいらっしゃいますか？", "① そちらこそ / ② 木村さんと話したいんですが..", "① そちらこそ / ② 木村様がいるんでしょうか？"], correct: "① こちらこそ / ② 木村様はいらっしゃいますか？", image: image_2 },
        { id: 3, question: "I will call back later:", options: ["後ほどかけ直します。", "1", "2", "3"], correct: "後ほどかけ直します。"}
    ]


    const [ currentQuestion, setCurrentQuestion ] = useState(0)
    const [ questions, setShuffledQuestions] = useState(init_questions)
    const [ feedback, setFeedback ] = useState(questions[currentQuestion].question)
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
            setFeedback("Correct!")
            setIsCorrect(true)
            setHideButtons(true)

            if (currentQuestion < (questions.length - 1)) {
                setTimeout(() => {
                    setFeedback(questions[currentQuestion + 1].question)
                    setCurrentQuestion((prev) => prev + 1)
                    setIsCorrect(false)
                    setHideButtons(false)
                }, 1500)
            } else {
                setFeedback("1/4 Section(s) complete!")
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
                setFeedback(questions[currentQuestion].question)
                setHideButtons(false)
            }, 1500);
        }
    }

    return (
        <div className="question-container">
            <div className='image-container'>
                <img src={questions[currentQuestion].image} alt="topic-image" />
            </div>
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