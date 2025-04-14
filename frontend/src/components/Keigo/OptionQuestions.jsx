import { useEffect, useState } from 'react';
import "./OptionQuestions.css";
import Button from '../Button/Button';


function VocabularyQuestions({ onCleared, keigoData, images }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [feedback, setFeedback] = useState();
    const [isCorrect, setIsCorrect] = useState(false);
    const [hideButtons, setHideButtons] = useState(false);

    const imageMap = images.reduce((acc, x, i) => {
        acc[`image_${i + 1}`] = x;
        return acc;
    }, {});


    function shuffleOptions(array) {
        let currentIndex = array.length;
        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    useEffect(() => {
        const loadedQuestions = keigoData.map(q => ({
            ...q,
            image: imageMap[q.image] 
        }));
        setQuestions(loadedQuestions);

        setQuestions(prevQuestions =>
            prevQuestions.map(q => ({
                ...q,
                options: shuffleOptions([...q.options])
            }))
        );
    }, []);

    const handleAnswerClick = (answer) => {
        const correctAnswer = questions[currentQuestion].correct;
        if (answer === correctAnswer) {
            setFeedback("Correct!");
            setIsCorrect(true);
            setHideButtons(true);
            if (currentQuestion < questions.length - 1) {
                setTimeout(() => {
                    setFeedback(questions[currentQuestion + 1].question);
                    setCurrentQuestion(prev => prev + 1);
                    setIsCorrect(false);
                    setHideButtons(false);
                }, 1500);
            } else {
                setFeedback("1/4 Section(s) complete!");
                setHideButtons(true);
                setTimeout(() => {
                    setIsCorrect(false);
                    setHideButtons(false);
                    onCleared();
                }, 1500);
            }
        } else {
            setFeedback("Try again!");
            setHideButtons(true);
            questions[currentQuestion].options = questions[currentQuestion].options.filter(option => option !== answer);
            setTimeout(() => {
                setFeedback(questions[currentQuestion].question);
                setHideButtons(false);
            }, 1500);
        }
    };

    return (
        <div className="optionQuestion-container">
            <div className="image-container">
                <img src={questions[currentQuestion]?.image} alt="topic-image" />
            </div>
            {!hideButtons ? (
                <>
                    <div className="feedback">{feedback}</div>
                    <div className="options">
                        {questions[currentQuestion]?.options.map((option, index) => (
                            <Button standard className="option-buttons" key={index} onClick={() => handleAnswerClick(option)}>
                                {option}
                            </Button>
                        ))}
                    </div>
                </>
            ) : (
                <div className="feedback">
                    {isCorrect ? <span className="correct">{feedback}</span> : <span className="incorrect">{feedback}</span>}
                </div>
            )}
        </div>
    );
}

export default VocabularyQuestions;
