import Button from "../components/Button/Button"
import { useEffect, useState } from 'react'
import { Navbar } from "../components/Navbar/Navbar"
import bunpo_data from '../data/bunpo_data.json'
import "./Bunpo.css"

function Bunpo({onCleared}) {

    const init_questions = bunpo_data

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
                setFeedback("Section complete!")
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
        <>
        <div className="container">
            <div><Navbar /></div>
            <div className='bunpo-questionnaire'>
                {!hideButtons ? (
                    <>
                    <div className="feedback">{feedback}</div>
                    <div className='button-grid'>
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
        </div>
        </>
    )
};

export default Bunpo;