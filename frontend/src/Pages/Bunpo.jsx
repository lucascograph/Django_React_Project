import Button from "../components/Button/Button"
import { useEffect, useState } from 'react'
import { Navbar } from "../components/Navbar/Navbar"
import bunpo_data from '../data/bunpo_data.json'
import "./Bunpo.css"
import api from "../Api"

function Bunpo() {

    const bunpo_questions = bunpo_data

    const [ currentQuestion, setCurrentQuestion ] = useState(0)
    const [ questions, setShuffledQuestions] = useState([])
    const [ feedback, setFeedback ] = useState("")
    const [ isCorrect, setIsCorrect ] = useState(false)
    const [ hideButtons, setHideButtons ] = useState(false)
    const [ levelSet, setLevelSet ] = useState(false)

    const levels = ["n1", "n2", "n3", "n4", "n5"]

    const registerClearedQuestion = async (questionId) => {
        const response = await api.post("api/cleared/bunpo/", {
            questionId: questionId
        })
    }

    const handleSetLevelClick = (selectedLevel) => {
        const selectedLevelQuestions = bunpo_questions[selectedLevel];

        const shuffleArray = (array) => {
            let shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        };

        let shuffledQuestions = shuffleArray(selectedLevelQuestions);

        shuffledQuestions = shuffledQuestions.map(question => ({
            ...question,
            options: shuffleArray(question.options)
        }));

        setShuffledQuestions(shuffledQuestions);
        setFeedback(shuffledQuestions[currentQuestion].question)
        setLevelSet(true)
    };

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
                    setLevelSet(false)
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
                {!levelSet ? (
                    <div className="level-buttons">
                    {levels.map((level, index) => (
                        <Button standard className="level-button" key={index} onClick={() => handleSetLevelClick(level)}>
                            {level.toUpperCase()}
                        </Button>
                    ))}
                    </div>
                ) : (
                <>
                {!hideButtons ? (
                    <>
                    <div className="feedback" dangerouslySetInnerHTML={{ __html: feedback }}></div>
                    <div className='button-grid'>
                    {questions[currentQuestion].options.map((option, index) => (
                        <Button standard className="option-buttons" key={index} onClick={() => handleAnswerClick(option)}>
                            {option}
                        </Button>
                    ))}
                    </div>
                    </>
                ) : (
                    <div className="feedback">{isCorrect ? <span className='correct'>{feedback}</span> : <span className='incorrect'>{feedback}</span>}</div>
                )}
                </>
                )}
            </div>
        </div>
        </>
    )
};

export default Bunpo;